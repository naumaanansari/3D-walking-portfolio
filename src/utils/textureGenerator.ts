import * as THREE from 'three';

// Cache generated textures so they are created once
const textureCache = new Map<string, THREE.CanvasTexture>();

/**
 * Creates a high-res signage texture with clean typography and subtle border
 */
export function createSignTexture(
  title: string,
  subtitle?: string,
  bgColor: string = '#FAF8F5',
  textColor: string = '#1E293B',
  accentColor: string = '#4D6B53'
): THREE.CanvasTexture {
  const cacheKey = `sign_${title}_${subtitle}_${bgColor}_${textColor}`;
  if (textureCache.has(cacheKey)) {
    return textureCache.get(cacheKey)!;
  }

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 128;
  const ctx = canvas.getContext('2d')!;

  // Background
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Subtle accent line on left or bottom
  ctx.fillStyle = accentColor;
  ctx.fillRect(0, 0, 12, canvas.height);

  // Border
  ctx.strokeStyle = '#E2D9CC';
  ctx.lineWidth = 4;
  ctx.strokeRect(2, 2, canvas.width - 4, canvas.height - 4);

  // Title Text
  ctx.fillStyle = textColor;
  ctx.font = 'bold 36px "Plus Jakarta Sans", system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = subtitle ? 'bottom' : 'middle';
  const textY = subtitle ? 72 : 64;
  ctx.fillText(title, canvas.width / 2 + 6, textY);

  // Subtitle Text
  if (subtitle) {
    ctx.fillStyle = '#64748B';
    ctx.font = '600 20px "Plus Jakarta Sans", system-ui, sans-serif';
    ctx.textBaseline = 'top';
    ctx.fillText(subtitle, canvas.width / 2 + 6, 78);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  textureCache.set(cacheKey, texture);
  return texture;
}

/**
 * Creates realistic monitor screen textures with believable UI content
 */
export function createScreenTexture(type: 'code' | 'ai' | 'design' | 'analyst' | 'qa' | 'laptop'): THREE.CanvasTexture {
  const cacheKey = `screen_${type}`;
  if (textureCache.has(cacheKey)) {
    return textureCache.get(cacheKey)!;
  }

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 320;
  const ctx = canvas.getContext('2d')!;

  if (type === 'code') {
    // Dark code editor (VS Code style)
    ctx.fillStyle = '#1E1E2E';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Title bar
    ctx.fillStyle = '#181825';
    ctx.fillRect(0, 0, canvas.width, 32);

    // Window dots
    ctx.fillStyle = '#F38BA8';
    ctx.beginPath();
    ctx.arc(20, 16, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#F9E2AF';
    ctx.beginPath();
    ctx.arc(38, 16, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#A6E3A1';
    ctx.beginPath();
    ctx.arc(56, 16, 6, 0, Math.PI * 2);
    ctx.fill();

    // Tab
    ctx.fillStyle = '#313244';
    ctx.fillRect(80, 4, 130, 28);
    ctx.fillStyle = '#CDD6F4';
    ctx.font = '14px monospace';
    ctx.fillText('Architecture.ts', 95, 22);

    // Code lines with colorful syntax highlighting
    const lines = [
      { text: 'import { CloudSystem } from "@infra/core";', color: '#CBA6F7' },
      { text: '', color: '' },
      { text: 'export class MicroservicesOrchestrator {', color: '#89B4FA' },
      { text: '  private readonly clusters: Map<string, Node>;', color: '#A6ADC8' },
      { text: '  constructor(private config: EnterpriseConfig) {', color: '#FAB387' },
      { text: '    this.initializeHighThroughputQueue();', color: '#A6E3A1' },
      { text: '    this.enableResilientFailover(99.995);', color: '#F9E2AF' },
      { text: '  }', color: '#FAB387' },
      { text: '  async routePacket(payload: DataStream) {', color: '#89B4FA' },
      { text: '    return await this.mesh.dispatch(payload);', color: '#94E2D5' },
      { text: '  }', color: '#89B4FA' },
      { text: '}', color: '#89B4FA' },
    ];

    ctx.font = '15px monospace';
    lines.forEach((line, i) => {
      if (line.text) {
        ctx.fillStyle = '#585B70';
        ctx.fillText(String(i + 1).padStart(2, ' '), 15, 60 + i * 22);
        ctx.fillStyle = line.color;
        ctx.fillText(line.text, 50, 60 + i * 22);
      }
    });
  } else if (type === 'ai') {
    // AI Dashboard
    ctx.fillStyle = '#0F172A';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#1E293B';
    ctx.fillRect(0, 0, canvas.width, 36);

    ctx.fillStyle = '#38BDF8';
    ctx.font = 'bold 15px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('NEURAL WORKFLOW ENGINE · v3.2', 20, 24);

    // Status badges
    ctx.fillStyle = '#065F46';
    ctx.fillRect(360, 8, 130, 20);
    ctx.fillStyle = '#34D399';
    ctx.font = 'bold 11px sans-serif';
    ctx.fillText('● AGENT ONLINE', 375, 22);

    // Neural diagram boxes
    ctx.fillStyle = '#1E293B';
    ctx.strokeStyle = '#38BDF8';
    ctx.lineWidth = 2;

    ctx.strokeRect(30, 60, 120, 70);
    ctx.fillRect(30, 60, 120, 70);
    ctx.fillStyle = '#E2E8F0';
    ctx.font = '12px sans-serif';
    ctx.fillText('Context Parser', 45, 95);

    ctx.strokeRect(196, 60, 120, 70);
    ctx.fillRect(196, 60, 120, 70);
    ctx.fillStyle = '#E2E8F0';
    ctx.fillText('LLM Synthesis', 215, 95);

    ctx.strokeRect(360, 60, 120, 70);
    ctx.fillRect(360, 60, 120, 70);
    ctx.fillStyle = '#E2E8F0';
    ctx.fillText('Tool Execution', 378, 95);

    // Latency & metric chart
    ctx.fillStyle = '#1E293B';
    ctx.fillRect(30, 160, 450, 130);
    ctx.fillStyle = '#94A3B8';
    ctx.font = '12px sans-serif';
    ctx.fillText('System Latency: 42ms · Throughput: 12,400 req/s', 45, 185);

    // Waveform
    ctx.strokeStyle = '#10B981';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(45, 260);
    ctx.bezierCurveTo(120, 210, 160, 270, 220, 225);
    ctx.bezierCurveTo(280, 190, 340, 250, 460, 205);
    ctx.stroke();
  } else if (type === 'design') {
    // UI/UX Figma-style interface
    ctx.fillStyle = '#F8FAFC';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, 36);
    ctx.fillStyle = '#334155';
    ctx.font = 'bold 13px sans-serif';
    ctx.fillText('Figma · Walking Office Design System', 20, 23);

    // Mobile Artboards
    ctx.fillStyle = '#FFFFFF';
    ctx.strokeStyle = '#CBD5E1';
    ctx.lineWidth = 2;

    // Artboard 1
    ctx.strokeRect(30, 55, 130, 240);
    ctx.fillRect(30, 55, 130, 240);
    ctx.fillStyle = '#4D6B53';
    ctx.fillRect(30, 55, 130, 40);
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 11px sans-serif';
    ctx.fillText('Welcome', 45, 80);
    ctx.fillStyle = '#E2E8F0';
    ctx.fillRect(45, 110, 100, 24);
    ctx.fillRect(45, 145, 100, 24);

    // Artboard 2
    ctx.strokeRect(190, 55, 130, 240);
    ctx.fillRect(190, 55, 130, 240);
    ctx.fillStyle = '#D97706';
    ctx.fillRect(190, 55, 130, 40);
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText('Dashboard', 205, 80);
    ctx.fillStyle = '#FDE68A';
    ctx.beginPath();
    ctx.arc(255, 150, 30, 0, Math.PI * 2);
    ctx.fill();

    // Artboard 3
    ctx.strokeRect(350, 55, 130, 240);
    ctx.fillRect(350, 55, 130, 240);
    ctx.fillStyle = '#8B5CF6';
    ctx.fillRect(350, 55, 130, 40);
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText('Analytics', 365, 80);
  } else if (type === 'analyst') {
    // Business Analyst: Kanban & Gantt
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#F1F5F9';
    ctx.fillRect(0, 0, canvas.width, 36);
    ctx.fillStyle = '#0F172A';
    ctx.font = 'bold 14px sans-serif';
    ctx.fillText('Jira · Enterprise Value Stream Roadmap', 20, 23);

    // Columns
    const cols = ['DISCOVERY', 'SPEC IN REVIEW', 'IMPLEMENTATION', 'DELIVERED'];
    cols.forEach((col, i) => {
      const x = 20 + i * 120;
      ctx.fillStyle = '#F8FAFC';
      ctx.fillRect(x, 48, 110, 255);
      ctx.fillStyle = '#475569';
      ctx.font = 'bold 10px sans-serif';
      ctx.fillText(col, x + 8, 68);

      // Card
      ctx.fillStyle = '#FFFFFF';
      ctx.strokeStyle = '#E2E8F0';
      ctx.lineWidth = 1;
      ctx.strokeRect(x + 5, 80, 100, 60);
      ctx.fillRect(x + 5, 80, 100, 60);
      ctx.fillStyle = i === 3 ? '#16A34A' : '#2563EB';
      ctx.fillRect(x + 10, 88, 30, 6);
      ctx.fillStyle = '#1E293B';
      ctx.font = '9px sans-serif';
      ctx.fillText('Feature #' + (102 + i), x + 10, 110);
    });
  } else if (type === 'qa') {
    // QA Automated Test Matrix
    ctx.fillStyle = '#0B132B';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#1C2541';
    ctx.fillRect(0, 0, canvas.width, 36);
    ctx.fillStyle = '#5BC0BE';
    ctx.font = 'bold 14px sans-serif';
    ctx.fillText('CYPRESS / PLAYWRIGHT CI PIPELINE', 20, 23);

    ctx.fillStyle = '#10B981';
    ctx.font = 'bold 12px monospace';
    ctx.fillText('ALL 438 END-TO-END TESTS PASSING (0 FAILS)', 20, 65);

    const testSuites = [
      '✓ Auth SSO Flow · 24ms',
      '✓ Realtime WebSocket Sync · 18ms',
      '✓ Transaction Idempotency · 42ms',
      '✓ 3D Isometric Viewport Bounds · 12ms',
      '✓ Accessibility WCAG AA Compliance · 8ms',
      '✓ Performance Benchmark 60 FPS · 16ms',
    ];

    testSuites.forEach((t, idx) => {
      ctx.fillStyle = '#34D399';
      ctx.font = '13px monospace';
      ctx.fillText(t, 25, 105 + idx * 30);
    });
  } else {
    // Laptop (Nauman's executive dashboard)
    ctx.fillStyle = '#0F172A';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#38BDF8';
    ctx.font = 'bold 18px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('NAUMAN ANSARI · STUDIO METRICS', 30, 45);

    ctx.fillStyle = '#E2E8F0';
    ctx.font = '14px sans-serif';
    ctx.fillText('Active Projects: 4 Enterprise · Architecture Velocity: 99.8%', 30, 85);

    // Mini chart bars
    const heights = [60, 95, 140, 110, 175, 190, 160, 210];
    heights.forEach((h, i) => {
      ctx.fillStyle = '#3B82F6';
      ctx.fillRect(40 + i * 52, 280 - h, 36, h);
    });
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  textureCache.set(cacheKey, texture);
  return texture;
}

/**
 * Creates framed diploma / certificate parchment texture
 */
export function createDiplomaTexture(title: string, issuer: string, year: string): THREE.CanvasTexture {
  const cacheKey = `diploma_${title}_${issuer}_${year}`;
  if (textureCache.has(cacheKey)) {
    return textureCache.get(cacheKey)!;
  }

  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 340;
  const ctx = canvas.getContext('2d')!;

  // Parchment paper
  ctx.fillStyle = '#FAF7F0';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Ornate double border
  ctx.strokeStyle = '#D4AF37';
  ctx.lineWidth = 6;
  ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);
  ctx.lineWidth = 1.5;
  ctx.strokeRect(18, 18, canvas.width - 36, canvas.height - 36);

  // Certificate Header
  ctx.fillStyle = '#1E293B';
  ctx.font = 'bold 16px "Plus Jakarta Sans", serif';
  ctx.textAlign = 'center';
  ctx.fillText('CERTIFICATE OF ACHIEVEMENT', canvas.width / 2, 55);

  ctx.fillStyle = '#64748B';
  ctx.font = 'italic 12px serif';
  ctx.fillText('This is proudly awarded to', canvas.width / 2, 85);

  // Candidate
  ctx.fillStyle = '#4D6B53';
  ctx.font = 'bold 20px serif';
  ctx.fillText('Nauman Ansari', canvas.width / 2, 120);

  // Qualification
  ctx.fillStyle = '#0F172A';
  ctx.font = 'bold 15px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(title, canvas.width / 2, 165);

  // Issuer & Year
  ctx.fillStyle = '#475569';
  ctx.font = '12px sans-serif';
  ctx.fillText(issuer, canvas.width / 2, 205);
  ctx.fillText(year, canvas.width / 2, 230);

  // Golden wax seal
  ctx.fillStyle = '#D4AF37';
  ctx.beginPath();
  ctx.arc(canvas.width / 2, 280, 22, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#B8860B';
  ctx.font = 'bold 9px sans-serif';
  ctx.fillText('VERIFIED', canvas.width / 2, 283);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  textureCache.set(cacheKey, texture);
  return texture;
}

/**
 * Creates polished floor stone tiles texture with subtle joints
 */
export function createFloorTileTexture(): THREE.CanvasTexture {
  const cacheKey = 'floor_tiles';
  if (textureCache.has(cacheKey)) {
    return textureCache.get(cacheKey)!;
  }

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  // Light warm limestone
  ctx.fillStyle = '#F5EFE6';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 4 large tile squares with fine grout lines
  ctx.strokeStyle = '#E3D7C5';
  ctx.lineWidth = 3;

  const tileSize = 128;
  for (let x = 0; x < canvas.width; x += tileSize) {
    for (let y = 0; y < canvas.height; y += tileSize) {
      // Subtle color jitter between tiles
      const shade = ((x + y) % (tileSize * 2) === 0) ? '#FAF5ED' : '#F4ECE1';
      ctx.fillStyle = shade;
      ctx.fillRect(x + 2, y + 2, tileSize - 4, tileSize - 4);
      ctx.strokeRect(x, y, tileSize, tileSize);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(8, 8);
  texture.needsUpdate = true;
  textureCache.set(cacheKey, texture);
  return texture;
}

/**
 * Creates warm wood parquet / slat texture
 */
export function createWoodParquetTexture(): THREE.CanvasTexture {
  const cacheKey = 'wood_parquet';
  if (textureCache.has(cacheKey)) {
    return textureCache.get(cacheKey)!;
  }

  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#DDBA91';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const plankHeight = 32;
  for (let y = 0; y < canvas.height; y += plankHeight) {
    ctx.fillStyle = y % 64 === 0 ? '#D4B084' : '#E0C199';
    ctx.fillRect(0, y + 1, canvas.width, plankHeight - 2);
    ctx.strokeStyle = '#B99368';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(0, y, canvas.width, plankHeight);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 4);
  texture.needsUpdate = true;
  textureCache.set(cacheKey, texture);
  return texture;
}
