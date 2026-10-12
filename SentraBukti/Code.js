function doGet(e) {
  if (e.parameter.page == 'dashboard') {
    return HtmlService.createHtmlOutputFromFile('Dashboard')
        .setTitle('Login Dashboard Admin')
        .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  } else {
    return HtmlService.createHtmlOutputFromFile('Index')
        .setTitle('Form Upload Toko')
        .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  }
}

function prosesUpload(dataForm) {
  try {
    var folderUtama = DriveApp.getFolderById("YOUR ID FOLDER"); 
    var folderDivisi;
    var cariFolder = folderUtama.getFoldersByName(dataForm.divisi);
    if (cariFolder.hasNext()) { folderDivisi = cariFolder.next(); } 
    else { folderDivisi = folderUtama.createFolder(dataForm.divisi); }

    var dataFile = Utilities.base64Decode(dataForm.base64);
    
    // Penamaan File Tanpa Ekstensi di Tengah
    var ekstensi = "";
    if (dataForm.namaFile.indexOf(".") !== -1) {
      ekstensi = dataForm.namaFile.substring(dataForm.namaFile.lastIndexOf("."));
    }
    var namaFileBersih = dataForm.namaToko + ekstensi;
    var blob = Utilities.newBlob(dataFile, dataForm.tipe, namaFileBersih);
    
    var fileBaru = folderDivisi.createFile(blob);
    
    // --- FITUR BARU: Menyimpan Tgl Transfer & User NIK sebagai JSON di Deskripsi ---
    var infoTambahan = {
      tgl: dataForm.tanggalTransfer,
      user: dataForm.userNik
    };
    fileBaru.setDescription(JSON.stringify(infoTambahan));
    
    return "Berhasil! File tersimpan di divisi " + dataForm.divisi;
  } catch (error) {
    throw new Error(error.toString());
  }
}

function verifikasiLogin(username, password) {
  var daftarAdmin = {
    "admin" : "password123"   
  };
  
  if (daftarAdmin[username] && daftarAdmin[username] === password) { return "TOKEN_SAH_A1B2C3"; } 
  else { throw new Error("Username atau Password salah!"); }
}

function getDaftarFile(token) {
  if (token !== "TOKEN_SAH_A1B2C3") { throw new Error("Akses Ilegal Terdeteksi!"); }

  var folderUtama = DriveApp.getFolderById("YOUR ID FOLDER"); 
  var daftarFile = [];
  var folders = folderUtama.getFolders();
  
  while (folders.hasNext()) {
    var folderDivisi = folders.next();
    var files = folderDivisi.getFiles();
    while (files.hasNext()) {
      var file = files.next();
      
      // --- FITUR BARU: Membaca JSON dari Deskripsi File ---
      var desc = file.getDescription();
      var tglTransfer = "-";
      var namaUser = "-";
      
      if (desc) {
        try {
          var parsed = JSON.parse(desc);
          tglTransfer = parsed.tgl || "-";
          namaUser = parsed.user || "-";
        } catch (e) {
          // Jika ini adalah file lama (yang cuma isi teks tanggal aja), jangan sampai error
          tglTransfer = desc;
        }
      }

      daftarFile.push({
        id: file.getId(), 
        nama: file.getName(), 
        divisi: folderDivisi.getName(),
        url: file.getUrl(), 
        tanggalTransfer: tglTransfer, 
        userNik: namaUser, // <-- Mengirim User NIK ke Dashboard
        tanggal: Utilities.formatDate(file.getDateCreated(), "GMT+7", "dd/MM/yyyy HH:mm")
      });
    }
  }
  
  daftarFile.sort(function(a,b){ return new Date(b.tanggal) - new Date(a.tanggal); });
  return daftarFile;
}

function hapusFile(idFile, token) {
  if (token !== "TOKEN_SAH_A1B2C3") { throw new Error("Akses Ilegal Terdeteksi!"); }
  try { DriveApp.getFileById(idFile).setTrashed(true); return "File berhasil dihapus"; } 
  catch(e) { throw new Error(e.toString()); }
}