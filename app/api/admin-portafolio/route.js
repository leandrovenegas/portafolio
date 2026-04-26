import { NextResponse } from 'next/server';
import supabase from '@/lib/supabase';

// GET — list all organizations
export async function GET() {
  const { data, error } = await supabase
    .from('organizations')
    .select('id, slug, name, type, seo_title, seo_description, og_image, keywords, is_indexed, markdown_url')
    .order('name', { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ organizations: data || [] });
}

// PATCH — update one organization's SEO / indexing fields
export async function PATCH(request) {
  try {
    const body = await request.json();
    const { id, ...fields } = body;

    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

    // Only allow safe fields to be updated
    const allowed = ['seo_title', 'seo_description', 'og_image', 'keywords', 'is_indexed', 'name'];
    const updates = Object.fromEntries(
      Object.entries(fields).filter(([k]) => allowed.includes(k))
    );

    const { data, error } = await supabase
      .from('organizations')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ organization: data });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
