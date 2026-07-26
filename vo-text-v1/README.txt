NARASI SIAP TEMPEL KE TTS
=========================

Dihasilkan otomatis dari VIDEO_SCRIPT_VO.md. Jangan diedit di sini, edit
markdown-nya lalu jalankan ulang:

    node tools/build-vo-text.mjs

Isi folder
----------
  pitch-full.txt        seluruh pitch 60 detik dalam satu blok
  demo-full.txt         seluruh demo 120 detik dalam satu blok
  pitch/                pitch dipecah per segmen
  demo/                 demo dipecah per scene, nama file memuat target durasi
  manifest.json         target durasi dan jumlah kata tiap segmen

Pakai yang mana
---------------
Untuk hasil rapi, generate PER SEGMEN, jangan sekali jalan. Nama file sudah
memuat target durasinya, misal 05-formfill-10s.txt berarti hasil audionya
harus mendekati 10 detik. Kalau digenerate sekaligus, tidak ada cara
menyelaraskan tiap kalimat ke scene-nya.

Tanda napas sudah dikonversi
----------------------------
Notasi | dan || di markdown dipakai untuk pembaca manusia. Di sini sudah
diganti koma dan pergantian baris, karena TTS akan membaca simbol itu apa
adanya. Jangan dimasukkan kembali.

Angka sengaja ditulis sebagai kata
----------------------------------
"delapan puluh dua dari seratus", bukan "82/100". Mesin TTS sering salah
membaca digit dan simbol. Jangan diubah jadi angka.

Menyamakan durasi
-----------------
TTS tidak bisa dipaksa ke detik tertentu. Alurnya:
  1. generate audio per segmen
  2. ukur durasinya:  ffprobe -v error -show_entries format=duration -of csv=p=0 file.mp3
  3. koreksi tempo tipis:  ffmpeg -i in.mp3 -filter:a "atempo=1.04" out.mp3
Jangan lewat kira-kira 6 persen, di atas itu suaranya mulai terdengar aneh.
Kalau selisihnya lebih besar dari itu, lebih baik potong kata di markdown.

Lisensi
-------
Panduan panitia mewajibkan aset yang dimiliki atau berizin. Tier gratis
beberapa layanan TTS mewajibkan atribusi dan membatasi penggunaan komersial,
jadi gunakan tier berbayar supaya hak pakainya jelas.
