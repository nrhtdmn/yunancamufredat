# Οδηγός — Yunanca Yol Haritası

A0’dan C2+’ya sistemli Modern Yunanca öğrenme ve **YDS** hazırlık PWA’sı.  
Telefonuna veya bilgisayarına kurulabilir; ilerleme tarayıcıda saklanır.

## Özellikler

- CEFR yol haritası: **A0 → A1 → A2 → B1 → B2 → C1 → C2 → C2+**
- Her gün “sıradaki görev” + tempo seçimi (kısa / standart / yoğun / YDS)
- Birim ve görev işaretleme, seri (streak), toplam süre
- Seviye kilidi: önceki seviye **%70** olmadan sonrakiler açılmaz
- YDS strateji paneli ve sınav odaklı görevler
- Offline çalışan PWA (service worker)

## Yerelde açma

Klasörü bir statik sunucu ile aç (file:// ile service worker çalışmayabilir):

```bash
npx serve .
```

veya VS Code / Cursor Live Server.

## GitHub Pages

1. Bu klasörü bir GitHub deposuna yükle.
2. **Settings → Pages → Deploy from a branch**
3. Branch: `main` (veya `master`), folder: `/ (root)`
4. Birkaç dakika sonra: `https://<kullanıcı>.github.io/<repo>/`

> Repo adı `yunancaogren` değilse ve site alt yolda yayınlanıyorsa yollar göreli (`./`) olduğu için genelde ek ayar gerekmez.

## Kullanım

1. İlk açılışta seviyeni ve günlük temponu seç (8 aylık çalışma ≈ çoğu kişi için A1–A2).
2. **Bugün** sekmesi ne yapacağını söyler — görevi bitir, işaretle.
3. **Yol** sekmesinden birimleri sırayla ilerle.
4. **YDS** sekmesi B2’den itibaren sınav hattını toplar.
5. Kaynak çokluğuna kapılma: uygulama ne dediyse onu bitir.

## Teknik

| Dosya | Rol |
|--------|-----|
| `index.html` | Kabuk |
| `js/curriculum.js` | Müfredat |
| `js/progress.js` | localStorage |
| `js/app.js` | Arayüz |
| `manifest.json` + `sw.js` | PWA |

Veri kaybı olmaması için ilerlemeyi sıfırlamadan önce emin ol; sıfırlama **İlerleme** sekmesindedir.
