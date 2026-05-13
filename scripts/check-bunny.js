#!/usr/bin/env node

/**
 * Script para verificar la configuración de Bunny Stream
 * Ejecuta: node scripts/check-bunny.js
 */

const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '..', '.env.local');

console.log('🔍 Verificando configuración de Bunny Stream...\n');

if (!fs.existsSync(envPath)) {
  console.log('❌ No se encontró el archivo .env.local');
  console.log('📝 Crea un archivo .env.local basado en .env.example');
  process.exit(1);
}

const envContent = fs.readFileSync(envPath, 'utf8');
const envVars = {};

envContent.split('\n').forEach(line => {
  const [key, ...valueParts] = line.split('=');
  if (key && valueParts.length > 0) {
    envVars[key.trim()] = valueParts.join('=').trim();
  }
});

const checks = [
  {
    name: 'BUNNY_API_KEY',
    value: envVars.BUNNY_API_KEY,
    required: false,
    description: 'API Key de Bunny Stream (opcional - usa datos locales si no está configurada)'
  },
  {
    name: 'NEXT_PUBLIC_BUNNY_LIBRARY_ID',
    value: envVars.NEXT_PUBLIC_BUNNY_LIBRARY_ID,
    required: true,
    description: 'ID de la librería de Bunny Stream'
  },
  {
    name: 'NEXT_PUBLIC_BUNNY_CDN_HOSTNAME',
    value: envVars.NEXT_PUBLIC_BUNNY_CDN_HOSTNAME,
    required: true,
    description: 'Hostname del CDN de Bunny Stream'
  }
];

let allGood = true;

checks.forEach(check => {
  const status = check.value ? '✅' : (check.required ? '❌' : '⚠️');
  console.log(`${status} ${check.name}: ${check.value ? 'Configurada' : 'No configurada'}`);
  console.log(`   ${check.description}`);

  if (check.required && !check.value) {
    allGood = false;
  }
  console.log('');
});

if (allGood) {
  console.log('🎉 Configuración completa!');
  if (envVars.BUNNY_API_KEY) {
    console.log('📺 Los videos se cargarán desde la API de Bunny Stream');
  } else {
    console.log('📁 Usando datos locales de respaldo');
  }
} else {
  console.log('⚠️  Configuración incompleta. Revisa las variables requeridas.');
  console.log('🔗 Obtén tu API Key en: https://panel.bunny.net/stream -> Account -> API');
}