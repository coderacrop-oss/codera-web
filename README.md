# coderasolutions.org

เว็บบริษัท Codera Solutions (static · GitHub Pages)

- `/` หน้าหลัก (`index.html`)
- `/queue/` หน้าคิววิเคราะห์ อ่านข้อมูลจาก `queue/data.json` (ไม่ติด Google: noindex + robots)
- อัปเดตคิว: แก้เฉพาะ `queue/data.json` แล้ว commit เว็บเปลี่ยนใน 1–2 นาที
- ห้ามใส่ LINE userId ลิงก์โฟลเดอร์เอกสาร หรือหมายเหตุทีมใน data.json (ไฟล์นี้ใครก็เปิดได้)
- รูปอยู่ `assets/img/` · ภาพแชร์ลิงก์ `assets/og.png`
- สถิติผู้เข้าชม (ท้ายหน้าหลัก): เก็บยอดที่ Supabase ฟรี ตั้งค่าครั้งเดียว
  1. สร้างโปรเจกต์ที่ supabase.com > SQL Editor > วางไฟล์ `supabase/visitor-stats.sql` > Run
  2. Project Settings > API: คัดลอก Project URL และ anon/publishable key ใส่ใน `assets/visits.js`
  3. ยังไม่ใส่ค่า = กล่องสถิติซ่อนไว้ · นับ 1 คนต่อเบราว์เซอร์ต่อวัน ตามเวลาไทย
