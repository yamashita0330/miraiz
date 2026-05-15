'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { DEMO_PARTNERS, PARTNER_COORDS, PARTNER_CATEGORY_LABEL } from '@/lib/demo';

// 黒い丸ピン（デフォルトアイコンの画像読み込み問題を回避）
const pinIcon = L.divIcon({
  className: '',
  html: `<div style="
    width:22px;height:22px;border-radius:50% 50% 50% 0;
    background:#0d0d0d;transform:rotate(-45deg);
    border:2px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,0.4);
  "></div>`,
  iconSize: [22, 22],
  iconAnchor: [11, 22],
  popupAnchor: [0, -22],
});

const ownedPinIcon = L.divIcon({
  className: '',
  html: `<div style="
    width:26px;height:26px;border-radius:50% 50% 50% 0;
    background:#e11d48;transform:rotate(-45deg);
    border:2px solid #fff;box-shadow:0 2px 8px rgba(225,29,72,0.5);
  "></div>`,
  iconSize: [26, 26],
  iconAnchor: [13, 26],
  popupAnchor: [0, -26],
});

export function PartnerMap() {
  // 座標を持つ店舗のみ
  const mapped = DEMO_PARTNERS
    .map((p) => ({ partner: p, coord: PARTNER_COORDS[p.id] }))
    .filter((x): x is { partner: typeof x.partner; coord: { lat: number; lng: number } } => x.coord != null);

  // 徳島市中心
  const center: [number, number] = [34.0715, 134.5510];

  return (
    <div className="overflow-hidden rounded-2xl border border-border">
      <MapContainer
        center={center}
        zoom={14}
        scrollWheelZoom={false}
        style={{ height: 280, width: '100%' }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {mapped.map(({ partner, coord }) => (
          <Marker
            key={partner.id}
            position={[coord.lat, coord.lng]}
            icon={partner.is_owned ? ownedPinIcon : pinIcon}
          >
            <Popup>
              <div style={{ minWidth: 160 }}>
                <p style={{ fontSize: 11, color: '#888', margin: 0 }}>
                  {PARTNER_CATEGORY_LABEL[partner.category]}
                </p>
                <p style={{ fontSize: 14, fontWeight: 700, margin: '2px 0' }}>
                  {partner.name}
                </p>
                <p style={{ fontSize: 11, color: '#666', margin: '0 0 6px' }}>
                  {partner.address}
                </p>
                <a
                  href={`/partners/${partner.id}`}
                  style={{ fontSize: 11, color: '#e11d48', fontWeight: 600 }}
                >
                  詳細を見る →
                </a>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
