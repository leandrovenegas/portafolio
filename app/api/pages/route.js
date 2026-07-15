import supabase from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');
  const action = searchParams.get('action');
  const context = searchParams.get('context');

  if (!slug) {
    return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
  }

  if (action === 'history') {
    const { data, error } = await supabase
      .from('page_versions')
      .select('id, version_name, created_at, is_active, is_published')
      .eq('slug', slug)
      .order('created_at', { ascending: false });
    
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data);
  }

  const versionId = searchParams.get('versionId');
  let query = supabase.from('page_versions').select('*').eq('slug', slug);
  
  if (versionId) {
    query = query.eq('id', versionId);
  } else if (context === 'public') {
    query = query.eq('is_published', true).order('created_at', { ascending: false }).limit(1);
  } else {
    query = query.eq('is_active', true).order('created_at', { ascending: false }).limit(1);
  }

  const { data, error } = await query.single();
  
  if (error && error.code !== 'PGRST116') {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data || { components: [] });
}

export async function POST(request) {
  const body = await request.json();
  const { slug, version_name, components, is_active, is_published = false } = body;

  if (is_active) {
    await supabase.from('page_versions').update({ is_active: false }).eq('slug', slug);
  }
  if (is_published) {
    await supabase.from('page_versions').update({ is_published: false }).eq('slug', slug);
  }

  const { data, error } = await supabase
    .from('page_versions')
    .insert([{ slug, version_name, components, is_active, is_published }])
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function PUT(request) {
  const body = await request.json();
  const { id, components, is_active, version_name, is_published } = body;

  let updatePayload = { components, is_active, version_name };
  if (typeof is_published === 'boolean') {
    updatePayload.is_published = is_published;
  }

  if (is_active || typeof is_published === 'boolean') {
    const { data: v } = await supabase.from('page_versions').select('slug').eq('id', id).single();
    if (v) {
      if (is_active) {
        await supabase.from('page_versions').update({ is_active: false }).eq('slug', v.slug);
      }
      if (is_published) {
        await supabase.from('page_versions').update({ is_published: false }).eq('slug', v.slug);
      }
    }
  }

  const { data, error } = await supabase
    .from('page_versions')
    .update(updatePayload)
    .eq('id', id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function PATCH(request) {
  const body = await request.json();
  const { id, is_published } = body;

  if (is_published) {
    // Primero buscar el slug
    const { data: v, error: fetchError } = await supabase.from('page_versions').select('slug').eq('id', id).single();
    if (fetchError) return NextResponse.json({ error: fetchError.message }, { status: 500 });
    
    // Despublicar las demás
    await supabase.from('page_versions').update({ is_published: false }).eq('slug', v.slug);
  }

  const { data, error } = await supabase
    .from('page_versions')
    .update({ is_published })
    .eq('id', id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
