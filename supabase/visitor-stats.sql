-- ตัวนับผู้เข้าชมเว็บ coderasolutions.org
-- วิธีใช้: เปิด Supabase > SQL Editor > วางทั้งไฟล์นี้ > Run (รันซ้ำได้ ไม่ลบยอดเดิม)
-- นับตามเวลาไทย (Asia/Bangkok) · 1 เบราว์เซอร์นับ 1 คนต่อวัน (เช็กฝั่งหน้าเว็บ)

create table if not exists public.site_visits_daily (
  day      date   primary key,
  visitors bigint not null default 0
);

-- ปิดการอ่าน/เขียนตารางตรงจากหน้าเว็บ ให้ผ่านฟังก์ชันด้านล่างเท่านั้น
alter table public.site_visits_daily enable row level security;
revoke all on public.site_visits_daily from anon, authenticated;

create or replace function public.track_visit(p_count boolean default true)
returns json
language plpgsql
security definer
set search_path = public
as $$
declare
  d date := (now() at time zone 'Asia/Bangkok')::date;
begin
  if p_count then
    insert into site_visits_daily as s (day, visitors) values (d, 1)
    on conflict (day) do update set visitors = s.visitors + 1;
  end if;

  return (
    select json_build_object(
      'today',     coalesce(sum(visitors) filter (where day = d), 0),
      'yesterday', coalesce(sum(visitors) filter (where day = d - 1), 0),
      'month',     coalesce(sum(visitors) filter (where day >= date_trunc('month', d)::date), 0),
      'total',     coalesce(sum(visitors), 0)
    )
    from site_visits_daily
  );
end;
$$;

revoke all on function public.track_visit(boolean) from public;
grant execute on function public.track_visit(boolean) to anon;

-- (ไม่บังคับ) ยกยอดรวมย้อนหลัง เช่นจาก Google Analytics ให้ "ผู้ชมทั้งสิ้น" ไม่เริ่มที่ 0
-- ใส่เป็นแถววันที่เก่า ๆ จะไปรวมแค่ยอดทั้งสิ้น ไม่กระทบวันนี้/เมื่อวาน/เดือนนี้
-- insert into public.site_visits_daily (day, visitors) values ('2000-01-01', 12345)
--   on conflict (day) do update set visitors = excluded.visitors;
