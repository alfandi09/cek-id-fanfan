Wajib WA ke wa.me/+6287719167254 agar kalo ada update script ga ketinggalan

[!] UNTUK MELIHAT LIST GAME DAN PARAMETER APINYA SILAHKAN BUKA ENDPOINT /api
    INSTALL EXTENSI JSON FORMATTER DI BROWSER KALIAN BIAR ENAK DIBACA

## INSTALL DI VPS OR VERCEL
1. Siapkan Hosting Node JS atau vps
2. Jangan Lupa install nodejs, dan pm2
3. Deploy Aplikasi Kamu dengan perintah diterminal, kalo pake hosting sesuaikan aja, kalo pake vercel tutornya ada dibawah
    - npm install
    - node 'index.js' atau 'pm2 start index.js'


Gapunya VPS? Gapunya Hosting Node? Tenang, Bisa hosting Gratisan di vercel
 - Upload scriptnya di github
 - Buka Akun vercel
 - Import Project


kalo masih ada pertanyaan/ada bug, silahkan chat, nanti tak bantu install


## Install DI CPANEL NODE (node 18 recomended)
1. upload ke file manager hosting
2. Jalanin node js di cpanel, kalau kurang ngerti bisa google caranya
    - startup file index.js


## CARA UPDATE LIST GAME JIKA ADA PERUBAHAN DARI PROVIDERNYA
1. Wajib dijalanin di computer atau di vps gabisa langsung di cpanel
2. Update Codashop Jalanin perintah dibawah (pastikan sudah berada di directory script gamenya)
    - node update-list-game/codashopUpdate.js
   Update DuniaGames Jalanin perintah dibawah (pastikan sudah berada di directory script gamenya)
    - node update-list-game/duniagamesUpdate.js

Kalo scripntya di cpanel Gimana?
Jalanin dulu cara diatas di pc lokal
lalu pergi ke folder lib
disini kalian copy saja list gamenya dari file codashhop.json atau duniaGames.json
lalu kalian edit file kalian yg di cpanel dengan list game yg baru
