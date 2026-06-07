
# Firebase Not Defteri

Basit, tarayıcı tabanlı bir not alma uygulamasıdır. Kullanıcılar not başlığı ve içeriği girip kaydedebilir, düzenleyebilir ve silebilir. Proje temel olarak eğitim amaçlıdır ve Firebase ile entegrasyon için başlangıç yapılandırması içerir.

## Canlı Özeti

- Not ekleme, düzenleme ve silme işlemleri `app.js` tarafından yönetilir.
- Arayüz: `index.html` ve `style.css`.
- Firebase yapılandırması: `firebase.js` (Realtime Database için temel ayarlar mevcut).

## Dosya Yapısı

- `index.html` - Uygulama arayüzü ve not formu.
- `style.css` - Tüm stil tanımları.
- `app.js` - Not kartları oluşturma, düzenleme, silme ve form davranışları.
- `firebase.js` - Firebase yapılandırması ve veritabanı bağlantısı.
- `package.json` - Proje bağımlılıkları (`firebase` belirtilmiş).

## Kurulum

1. Depoyu klonlayın veya proje dizinine gidin.

```bash
cd firebase-not-defteri
npm install
```

2. `index.html` dosyasını tarayıcıda açarak uygulamayı çalıştırabilirsiniz. (Basit statik bir proje olduğu için bir HTTP sunucusu ile çalıştırmak daha doğrudur.)

Örnek bir basit sunucu kullanımı:

```bash
npx http-server .
# veya
python -m http.server 8080
```

## Kullanım

1. `index.html` içindeki formdan not başlığı ve içeriğini girin.
2. "Notu Kaydet" butonuna tıklayın; not listeye bir kart olarak eklenir.
3. "Düzenle" ile not içeriği forma geri yüklenir ve düzenlenebilir.
4. "Sil" ile not tarayıcıdaki listeden kaldırılır.

> Mevcut uygulama notları yalnızca DOM içinde saklar; sayfa yenilendiğinde kaybolur.

## Firebase Entegrasyonu (Durum)

- `firebase.js` içinde Firebase SDK ve `getDatabase` ile temel yapılandırma bulunmaktadır.
- Ancak `app.js` içinde veritabanına yazma/okuma işlemleri henüz uygulanmamıştır. Kalıcı saklama için `set`, `push`, `onValue` veya `get` gibi Firebase Database API çağrıları eklenmelidir.

## Geliştirme Notları & Öneriler

- Notları kalıcı hale getirmek için Firebase Realtime Database veya Firestore entegrasyonu ekleyin.
- Kullanıcı başına ayrılmış not saklama için Firebase Authentication ekleyin.
- Notları düzenlemeyi sunucu tarafına da kaydedecek şekilde güncelleyin (id bazlı güncelleme).
- Uzun metinleri yönetmek için karakter sayacı veya otomatik kaydetme (autosave) ekleyin.
- Responsive tasarım ve mobil uyumluluk için `style.css` güncellemeleri yapılabilir.

## Bağımlılıklar

- Projede `firebase` bağımlılığı `package.json` içinde belirtilmiştir. Ancak tarayıcı tarafında CDN üzerinden SDK kullanımı tercih edilmiş. Prod ortamı için bağımlılık kullanımını gözden geçirin.

## Lisans

Bu proje eğitim amaçlıdır; özel bir lisans belirtilmemiştir.

---
