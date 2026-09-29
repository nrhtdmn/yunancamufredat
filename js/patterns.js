/* Cümle kalıpları — geniş yelpaze, kalıpla öğrenme */
const PATTERNS = {
  tips: [
    "Kalıp = iskelet. Boşluklara kendi kelimelerini koy.",
    "Her kalıbı 3 kez: ezberle → değiştir → sesli söyle.",
    "Aynı kalıbı olumlu / olumsuz / soru diye çevir.",
    "YDS ve yazmada hazır kalıp skor getirir."
  ],

  // her madde: frame (gösterim), slots (örnek doldurma), tr, level, cat
  bank: [
    // --- Temel varlık ---
    { cat: "varlık", level: "a1", frame: "Είμαι + meslek/sıfat", eg: "Είμαι φοιτητής.", tr: "…yim / …im" },
    { cat: "varlık", level: "a1", frame: "Δεν είμαι + …", eg: "Δεν είμαι κουρασμένος.", tr: "… değilim" },
    { cat: "varlık", level: "a1", frame: "Είναι + ο/η/το …", eg: "Είναι ο αδελφός μου.", tr: "O …" },
    { cat: "varlık", level: "a1", frame: "Έχω + nesne", eg: "Έχω δύο αδέρφια.", tr: "…ım var" },
    { cat: "varlık", level: "a1", frame: "Δεν έχω + nesne", eg: "Δεν έχω χρόνο.", tr: "…ım yok" },
    { cat: "varlık", level: "a1", frame: "Υπάρχει / Υπάρχουν + …", eg: "Υπάρχει ένα πρόβλημα.", tr: "Var / vardır" },

    // --- Tanışma ---
    { cat: "tanışma", level: "a0", frame: "Με λένε + ad", eg: "Με λένε Νίκο.", tr: "Adım …" },
    { cat: "tanışma", level: "a0", frame: "Πώς σε λένε;", eg: "Πώς σε λένε;", tr: "Adın ne?" },
    { cat: "tanışma", level: "a1", frame: "Είμαι από + την/το …", eg: "Είμαι από την Τουρκία.", tr: "…liyim / …denim" },
    { cat: "tanışma", level: "a1", frame: "Μένω στην/στο …", eg: "Μένω στην Αθήνα.", tr: "…de yaşıyorum" },
    { cat: "tanışma", level: "a1", frame: "Χαίρω πολύ.", eg: "Χαίρω πολύ.", tr: "Memnun oldum" },
    { cat: "tanışma", level: "a1", frame: "Τι κάνεις; / Τι κάνετε;", eg: "Τι κάνεις;", tr: "Nasılsın?" },

    // --- İstek / rica ---
    { cat: "istek", level: "a1", frame: "Θέλω + nesne", eg: "Θέλω έναν καφέ.", tr: "… istiyorum" },
    { cat: "istek", level: "a2", frame: "Θα ήθελα + nesne", eg: "Θα ήθελα ένα νερό.", tr: "… isterdim (nazik)" },
    { cat: "istek", level: "a2", frame: "Μπορώ να + fiil;", eg: "Μπορώ να περάσω;", tr: "…abilir miyim?" },
    { cat: "istek", level: "a2", frame: "Μήπως μπορείτε να + fiil;", eg: "Μήπως μπορείτε να βοηθήσετε;", tr: "…abilir misiniz?" },
    { cat: "istek", level: "b1", frame: "Θα προτιμούσα να + fiil", eg: "Θα προτιμούσα να μείνω.", tr: "…yi tercih ederdim" },
    { cat: "istek", level: "a1", frame: "Παρακαλώ + emir/rica", eg: "Έναν καφέ, παρακαλώ.", tr: "… lütfen" },

    // --- Zorunluluk / tavsiye ---
    { cat: "zorunluluk", level: "a2", frame: "Πρέπει να + fiil", eg: "Πρέπει να διαβάσω.", tr: "…meliyim" },
    { cat: "zorunluluk", level: "a2", frame: "Δεν πρέπει να + fiil", eg: "Δεν πρέπει να αργείς.", tr: "…memeli" },
    { cat: "zorunluluk", level: "b1", frame: "Καλό είναι να + fiil", eg: "Καλό είναι να κοιμάσαι νωρίς.", tr: "…men iyi olur" },
    { cat: "zorunluluk", level: "b1", frame: "Αξίζει να + fiil", eg: "Αξίζει να δοκιμάσεις.", tr: "…meye değer" },
    { cat: "zorunluluk", level: "b1", frame: "Χρειάζεται να + fiil", eg: "Χρειάζεται να φύγουμε.", tr: "…mek gerekiyor" },

    // --- Yetenek / izin ---
    { cat: "yetenek", level: "a2", frame: "Μπορώ να + fiil", eg: "Μπορώ να κολυμπήσω.", tr: "…ebilirim" },
    { cat: "yetenek", level: "a2", frame: "Δεν μπορώ να + fiil", eg: "Δεν μπορώ να έρθω.", tr: "…emem" },
    { cat: "yetenek", level: "b1", frame: "Ξέρω να + fiil", eg: "Ξέρω να οδηγώ.", tr: "…meyi bilirim" },
    { cat: "yetenek", level: "b1", frame: "Επιτρέπεται να + fiil;", eg: "Επιτρέπεται να καπνίσω;", tr: "…meye izin var mı?" },

    // --- Beğeni ---
    { cat: "beğeni", level: "a1", frame: "Μου αρέσει + …", eg: "Μου αρέσει ο καφές.", tr: "… severim" },
    { cat: "beğeni", level: "a1", frame: "Δεν μου αρέσει + …", eg: "Δεν μου αρέσει η βροχή.", tr: "… sevmem" },
    { cat: "beğeni", level: "a2", frame: "Μου αρέσει να + fiil", eg: "Μου αρέσει να διαβάζω.", tr: "…meyi severim" },
    { cat: "beğeni", level: "b1", frame: "Λατρεύω / Αποφεύγω + …", eg: "Λατρεύω τη μουσική.", tr: "bayılırım / kaçınırım" },

    // --- Zaman / plan ---
    { cat: "zaman", level: "a1", frame: "Κάθε + zaman + fiil", eg: "Κάθε μέρα διαβάζω.", tr: "Her … …rim" },
    { cat: "zaman", level: "a2", frame: "Όταν + fiil, + fiil", eg: "Όταν έχω χρόνο, βγαίνω.", tr: "…ince / …dığında" },
    { cat: "zaman", level: "a2", frame: "Θα + fiil + αύριο/απόψε", eg: "Θα πάω αύριο.", tr: "Yarın/akşam …acağım" },
    { cat: "zaman", level: "a2", frame: "Χθες + aorist", eg: "Χθες είδα τον Νίκο.", tr: "Dün …dim" },
    { cat: "zaman", level: "b1", frame: "Πριν + fiil / πριν από + süre", eg: "Πριν φύγω, θα φάω.", tr: "…meden önce" },
    { cat: "zaman", level: "b1", frame: "Αφού + fiil, …", eg: "Αφού τελειώσω, θα σε πάρω.", tr: "…dikten sonra" },
    { cat: "zaman", level: "b1", frame: "Μέχρι να + fiil", eg: "Περίμενε μέχρι να έρθω.", tr: "…ene kadar" },

    // --- Yer / yön ---
    { cat: "yer", level: "a1", frame: "Πού είναι + …;", eg: "Πού είναι η στάση;", tr: "… nerede?" },
    { cat: "yer", level: "a1", frame: "Είναι στην/στο …", eg: "Είναι στο κέντρο.", tr: "…de" },
    { cat: "yer", level: "a2", frame: "Πάω στην/στο …", eg: "Πάω στο σχολείο.", tr: "…e gidiyorum" },
    { cat: "yer", level: "a2", frame: "Έρχομαι από την/το …", eg: "Έρχομαι από τη δουλειά.", tr: "…den geliyorum" },
    { cat: "yer", level: "a2", frame: "Στρίψε δεξιά/αριστερά", eg: "Στρίψε δεξιά στο φανάρι.", tr: "Sağa/sola dön" },
    { cat: "yer", level: "b1", frame: "πάνω σε / κάτω από / δίπλα σε", eg: "Το βιβλίο είναι πάνω στο τραπέζι.", tr: "üstünde / altında / yanında" },

    // --- Soru kalıpları ---
    { cat: "soru", level: "a1", frame: "Τι + fiil;", eg: "Τι κάνεις;", tr: "Ne …?" },
    { cat: "soru", level: "a1", frame: "Πότε + fiil;", eg: "Πότε φεύγεις;", tr: "Ne zaman …?" },
    { cat: "soru", level: "a1", frame: "Γιατί + fiil;", eg: "Γιατί αργείς;", tr: "Neden …?" },
    { cat: "soru", level: "a1", frame: "Πώς + fiil;", eg: "Πώς πάω στο μουσείο;", tr: "Nasıl …?" },
    { cat: "soru", level: "a2", frame: "Πόσο κάνει / διαρκεί;", eg: "Πόσο κάνει;", tr: "Ne kadar / kaç?" },
    { cat: "soru", level: "a2", frame: "Ποιος/Ποια + fiil;", eg: "Ποιος ήρθε;", tr: "Kim …?" },
    { cat: "soru", level: "b1", frame: "Τι θα έλεγες αν…;", eg: "Τι θα έλεγες αν φύγαμε;", tr: "… olsa ne dersin?" },

    // --- Olumsuz / yasak ---
    { cat: "olumsuz", level: "a1", frame: "Δεν + fiil", eg: "Δεν καταλαβαίνω.", tr: "…miyorum" },
    { cat: "olumsuz", level: "a2", frame: "Μην + fiil!", eg: "Μην αργείς!", tr: "…me!" },
    { cat: "olumsuz", level: "a2", frame: "Δεν… ποτέ", eg: "Δεν καπνίζω ποτέ.", tr: "Asla …mem" },
    { cat: "olumsuz", level: "b1", frame: "Ούτε… ούτε…", eg: "Ούτε ήρθε ούτε τηλεφώνησε.", tr: "Ne … ne …" },
    { cat: "olumsuz", level: "b1", frame: "Χωρίς να + fiil", eg: "Έφυγε χωρίς να πει τίποτα.", tr: "…meden" },

    // --- Emir / teklif ---
    { cat: "emir", level: "a2", frame: "Έλα / Ελάτε + …", eg: "Έλα εδώ!", tr: "Gel…" },
    { cat: "emir", level: "a2", frame: "Ας + fiil", eg: "Ας φύγουμε.", tr: "…alım / …elim" },
    { cat: "emir", level: "a2", frame: "Δώσε μου + nesne", eg: "Δώσε μου το κλειδί.", tr: "Bana … ver" },
    { cat: "emir", level: "b1", frame: "Προσπάθησε να + fiil", eg: "Προσπάθησε να ηρεμήσεις.", tr: "…meye çalış" },

    // --- Koşul ---
    { cat: "koşul", level: "a2", frame: "Αν + şimdiki, θα + fiil", eg: "Αν βρέχει, θα μείνω.", tr: "Eğer …arsa, …acağım" },
    { cat: "koşul", level: "b1", frame: "Αν + imperfect, θα + imperfect", eg: "Αν είχα χρόνο, θα ερχόμουν.", tr: "… olsaydı, …rdım" },
    { cat: "koşul", level: "b1", frame: "Εκτός αν + …", eg: "Θα πάω εκτός αν βρέχει.", tr: "…medikçe" },
    { cat: "koşul", level: "b2", frame: "Ακόμα κι αν + …", eg: "Ακόμα κι αν αργήσω, περίμενε.", tr: "… bile olsa" },

    // --- Neden / sonuç ---
    { cat: "neden", level: "a2", frame: "… γιατί / επειδή …", eg: "Μένω σπίτι γιατί είμαι άρρωστος.", tr: "çünkü" },
    { cat: "neden", level: "a2", frame: "Γι' αυτό + fiil", eg: "Βρέχει, γι' αυτό παίρνω ομπρέλα.", tr: "bu yüzden" },
    { cat: "neden", level: "b1", frame: "Λόγω + genitif / εξαιτίας", eg: "Λόγω της βροχής έμεινα.", tr: "… nedeniyle" },
    { cat: "neden", level: "b2", frame: "Συνεπώς / Επομένως …", eg: "Συνεπώς πρέπει να φύγουμε.", tr: "dolayısıyla" },

    // --- Karşıtlık ---
    { cat: "karşıt", level: "a2", frame: "αλλά / όμως …", eg: "Θέλω να πάω, αλλά δεν μπορώ.", tr: "ama" },
    { cat: "karşıt", level: "b1", frame: "Παρόλο που + …, …", eg: "Παρόλο που βρέχει, θα βγω.", tr: "rağmen" },
    { cat: "karşıt", level: "b1", frame: "Ενώ + …, …", eg: "Ενώ διάβαζα, χτύπησε το τηλέφωνο.", tr: "…irken / oysa" },
    { cat: "karşıt", level: "b2", frame: "Ωστόσο / Εντούτοις …", eg: "Ωστόσο δεν συμφωνώ.", tr: "yine de" },
    { cat: "karşıt", level: "b2", frame: "Αντί να + fiil, …", eg: "Αντί να φύγει, έμεινε.", tr: "…mek yerine" },

    // --- Amaç ---
    { cat: "amaç", level: "a2", frame: "Για να + fiil", eg: "Διαβάζω για να μάθω.", tr: "…mek için" },
    { cat: "amaç", level: "b1", frame: "Ώστε να + fiil", eg: "Μίλα δυνατά ώστε να ακούσω.", tr: "öyle ki / için" },
    { cat: "amaç", level: "b2", frame: "Με σκοπό να + fiil", eg: "Ήρθε με σκοπό να βοηθήσει.", tr: "amacıyla" },

    // --- Göreli ---
    { cat: "göreli", level: "b1", frame: "Ο/Η/Το … που + fiil", eg: "Ο άνθρωπος που μιλάει είναι γιατρός.", tr: "… olan …" },
    { cat: "göreli", level: "b1", frame: "Αυτό που + fiil …", eg: "Αυτό που θέλω είναι ησυχία.", tr: "istediğim şey …" },
    { cat: "göreli", level: "b2", frame: "…, ο οποίος/η οποία …", eg: "Ο Νίκος, ο οποίος είναι δάσκαλος, …", tr: "ki o …" },

    // --- Karşılaştırma ---
    { cat: "karşılaştır", level: "a2", frame: "πιο + sıfat + από …", eg: "Είναι πιο μεγάλο από αυτό.", tr: "daha … …den" },
    { cat: "karşılaştır", level: "a2", frame: "τόσο … όσο …", eg: "Είναι τόσο καλό όσο…", tr: "kadar …" },
    { cat: "karşılaştır", level: "b1", frame: "ο/η/το πιο + sıfat", eg: "Είναι το πιο όμορφο.", tr: "en …" },
    { cat: "karşılaştır", level: "b1", frame: "λιγότερο + … από", eg: "Έχω λιγότερο χρόνο από σένα.", tr: "daha az" },

    // --- Görüş / yazma ---
    { cat: "görüş", level: "b1", frame: "Κατά τη γνώμη μου, …", eg: "Κατά τη γνώμη μου έχει δίκιο.", tr: "Bana göre" },
    { cat: "görüş", level: "b1", frame: "Πιστεύω ότι …", eg: "Πιστεύω ότι μπορούμε.", tr: "İnanıyorum ki" },
    { cat: "görüş", level: "b2", frame: "Φαίνεται ότι …", eg: "Φαίνεται ότι αργεί.", tr: "Görünüyor ki" },
    { cat: "görüş", level: "b2", frame: "Είναι σημαντικό να …", eg: "Είναι σημαντικό να διαβάζουμε.", tr: "…mek önemli" },
    { cat: "görüş", level: "b2", frame: "Για παράδειγμα, …", eg: "Για παράδειγμα, η Αθήνα…", tr: "Örneğin" },
    { cat: "görüş", level: "b2", frame: "Συμπερασματικά, …", eg: "Συμπερασματικά, συμφωνώ.", tr: "Sonuç olarak" },
    { cat: "görüş", level: "b2", frame: "Από την άλλη, …", eg: "Από την άλλη, κοστίζει πολύ.", tr: "Öte yandan" },
    { cat: "görüş", level: "c1", frame: "Δεν υπάρχει αμφιβολία ότι …", eg: "Δεν υπάρχει αμφιβολία ότι βοηθάει.", tr: "Şüphe yok ki" },

    // --- Dolaylı / aktarım ---
    { cat: "aktarım", level: "b1", frame: "Είπε ότι …", eg: "Είπε ότι θα έρθει.", tr: "… dedi ki" },
    { cat: "aktarım", level: "b1", frame: "Ρώτησε αν …", eg: "Ρώτησε αν είμαι καλά.", tr: "… diye sordu" },
    { cat: "aktarım", level: "b1", frame: "Μου είπε να + fiil", eg: "Μου είπε να περιμένω.", tr: "…memi söyledi" },
    { cat: "aktarım", level: "b2", frame: "Υποστήριξε ότι …", eg: "Υποστήριξε ότι είναι σωστό.", tr: "… savundu" },

    // --- Sağlık / duygu ---
    { cat: "sağlık", level: "a2", frame: "Με πονάει το/ο …", eg: "Με πονάει το κεφάλι.", tr: "…ım ağrıyor" },
    { cat: "sağlık", level: "a2", frame: "Νιώθω + sıfat", eg: "Νιώθω κουρασμένος.", tr: "… hissediyorum" },
    { cat: "sağlık", level: "a2", frame: "Είμαι χαρούμενος/η που …", eg: "Είμαι χαρούμενος που ήρθες.", tr: "… için mutluyum" },

    // --- Alışveriş / servis ---
    { cat: "alışveriş", level: "a1", frame: "Πόσο κάνει;", eg: "Πόσο κάνει;", tr: "Kaç para?" },
    { cat: "alışveriş", level: "a2", frame: "Μπορώ να πληρώσω με κάρτα;", eg: "Μπορώ να πληρώσω με κάρτα;", tr: "Kartla ödeyebilir miyim?" },
    { cat: "alışveriş", level: "a2", frame: "Τον λογαριασμό, παρακαλώ", eg: "Τον λογαριασμό, παρακαλώ.", tr: "Hesap lütfen" },
    { cat: "alışveriş", level: "a2", frame: "Θα το πάρω", eg: "Θα το πάρω.", tr: "Bunu alıyorum" },

    // --- Ofis / resmi ---
    { cat: "resmi", level: "b1", frame: "Θα ήθελα να σας ενημερώσω ότι …", eg: "Θα ήθελα να σας ενημερώσω ότι…", tr: "Sizi bilgilendirmek isterim" },
    { cat: "resmi", level: "b1", frame: "Παρακαλώ επιβεβαιώστε …", eg: "Παρακαλώ επιβεβαιώστε μέχρι αύριο.", tr: "Lütfen onaylayın" },
    { cat: "resmi", level: "b2", frame: "Σε συνέχεια του προηγούμενου …", eg: "Σε συνέχεια του μηνύματός σας…", tr: "Öncekinin devamında" },
    { cat: "resmi", level: "b2", frame: "Με εκτίμηση,", eg: "Με εκτίμηση,", tr: "Saygılarımla" },

    // --- YDS / akademik ---
    { cat: "akademik", level: "b2", frame: "Το κείμενο υποστηρίζει ότι …", eg: "Το κείμενο υποστηρίζει ότι…", tr: "Metin şunu savunuyor" },
    { cat: "akademik", level: "b2", frame: "Σύμφωνα με …", eg: "Σύμφωνα με την έρευνα…", tr: "…ye göre" },
    { cat: "akademik", level: "c1", frame: "Σε αντίθεση με …", eg: "Σε αντίθεση με την κοινή άποψη…", tr: "…nin aksine" },
    { cat: "akademik", level: "c1", frame: "Ιδιαίτερη σημασία έχει …", eg: "Ιδιαίτερη σημασία έχει η εκπαίδευση.", tr: "Özellikle önemli olan …" },
    { cat: "akademik", level: "c1", frame: "Με άλλα λόγια, …", eg: "Με άλλα λόγια, πρέπει να…", tr: "Başka bir deyişle" },
    { cat: "akademik", level: "c1", frame: "Λαμβάνοντας υπόψη ότι …", eg: "Λαμβάνοντας υπόψη ότι…", tr: "… göz önüne alınırsa" },

    // --- Konuşma doldurucu / doğal ---
    { cat: "doğal", level: "a2", frame: "Δεν πειράζει.", eg: "Δεν πειράζει.", tr: "Sorun değil" },
    { cat: "doğal", level: "a2", frame: "Έχεις δίκιο.", eg: "Έχεις δίκιο.", tr: "Haklısın" },
    { cat: "doğal", level: "b1", frame: "Άστο για αργότερα.", eg: "Άστο για αργότερα.", tr: "Sonraya bırak" },
    { cat: "doğal", level: "b1", frame: "Έχει νόημα.", eg: "Έχει νόημα.", tr: "Mantıklı" },
    { cat: "doğal", level: "b1", frame: "Στο περίπου.", eg: "Στο περίπου.", tr: "Aşağı yukarı" },
    { cat: "doğal", level: "b2", frame: "Με συγχωρείς, αλλά …", eg: "Με συγχωρείς, αλλά διαφωνώ.", tr: "Affedersin ama …" },

    // --- Zamir kalıpları ---
    { cat: "zamir", level: "a2", frame: "Τον/Την/Το + fiil", eg: "Τον βλέπω συχνά.", tr: "Onu …yorum" },
    { cat: "zamir", level: "a2", frame: "Μου το + fiil", eg: "Μου το έδωσε.", tr: "Bana onu …di" },
    { cat: "zamir", level: "b1", frame: "Σου το λέω επειδή …", eg: "Σου το λέω επειδή σε νοιάζομαι.", tr: "Sana onu … çünkü" },

    // --- Perfect / sonuç ---
    { cat: "perfect", level: "b2", frame: "Έχω + απρμφ", eg: "Έχω τελειώσει τη δουλειά.", tr: "…miş bulunuyorum / bitirmişim" },
    { cat: "perfect", level: "b2", frame: "Έχεις πάει ποτέ + …;", eg: "Έχεις πάει ποτέ στην Ελλάδα;", tr: "Hiç … gittin mi?" },

    // --- Varsayım ---
    { cat: "varsayım", level: "b2", frame: "Ίσως + fiil", eg: "Ίσως έρθει αργότερα.", tr: "Belki …" },
    { cat: "varsayım", level: "b2", frame: "Μάλλον + fiil", eg: "Μάλλον θα βρέξει.", tr: "Muhtemelen …" },
    { cat: "varsayım", level: "c1", frame: "Θα πρέπει να + fiil", eg: "Θα πρέπει να είναι εκεί.", tr: "…malı / herhalde …" }
  ]
};

(function applyPatterns() {
  if (typeof TRAINERS !== "undefined" && PATTERNS.tips) {
    TRAINERS.tips = TRAINERS.tips.concat(PATTERNS.tips);
  }
  if (typeof EXTRAS4 !== "undefined" && PATTERNS.bank) {
    // günün kalıbına da çeşit ekle
    const phraseSlice = PATTERNS.bank
      .filter((p) => p.eg && !p.eg.includes("…") && p.eg.length < 60)
      .slice(0, 40)
      .map((p) => ({ el: p.eg, tr: p.tr + " · " + p.frame }));
    EXTRAS4.phrases = EXTRAS4.phrases.concat(phraseSlice);
  }
  if (typeof CURRICULUM !== "undefined") {
    const a2 = CURRICULUM.levels.find((l) => l.id === "a2");
    const b1 = CURRICULUM.levels.find((l) => l.id === "b1");
    const b2 = CURRICULUM.levels.find((l) => l.id === "b2");
    const unitA2 = {
      id: "a2-u9",
      title: "Cümle Kalıpları I",
      focus: "iskelet: θέλω / πρέπει / όταν / για να",
      tasks: [
        { id: "a2-u9-t1", title: "Temel kalıp bankası", detail: "İstek, zorunluluk, zaman kalıplarını ezberle.", minutes: 25, type: "study" },
        { id: "a2-u9-t2", title: "Kalıbı doldur", detail: "Her kalıba 3 kendi cümlen.", minutes: 25, type: "practice" },
        { id: "a2-u9-t3", title: "Kalıp konuşması", detail: "2 dk: sadece kalıp iskeletiyle konuş.", minutes: 20, type: "speak" }
      ]
    };
    const unitB1 = {
      id: "b1-u8",
      title: "Cümle Kalıpları II",
      focus: "koşul, göreli, karşıtlık",
      tasks: [
        { id: "b1-u8-t1", title: "Bağlaçlı kalıplar", detail: "παρόλο που, γι' αυτό, για να…", minutes: 25, type: "study" },
        { id: "b1-u8-t2", title: "που & αν kalıpları", detail: "15 dönüşüm cümlesi.", minutes: 25, type: "practice" },
        { id: "b1-u8-t3", title: "Kalıp yazısı", detail: "150 kelime, en az 8 kalıp.", minutes: 30, type: "write" }
      ]
    };
    const unitB2 = {
      id: "b2-u7",
      title: "Cümle Kalıpları III",
      focus: "görüş, akademik, resmi",
      tasks: [
        { id: "b2-u7-t1", title: "Görüş & akademik kalıp", detail: "Κατά τη γνώμη μου… Σύμφωνα με…", minutes: 25, type: "study" },
        { id: "b2-u7-t2", title: "Resmi mail kalıpları", detail: "Bilgilendirme + onay + kapanış.", minutes: 25, type: "write" },
        { id: "b2-u7-t3", title: "YDS kalıp avı", detail: "Cloze/okumada kalıp işaretle.", minutes: 25, type: "yds" }
      ]
    };
    if (a2 && !a2.units.some((u) => u.id === unitA2.id)) a2.units.push(unitA2);
    if (b1 && !b1.units.some((u) => u.id === unitB1.id)) b1.units.push(unitB1);
    if (b2 && !b2.units.some((u) => u.id === unitB2.id)) b2.units.push(unitB2);
  }
  if (typeof LESSONS !== "undefined") {
    const common = {
      train: "pattern"
    };
    LESSONS["a2-u9-t1"] = {
      goal: "Temel cümle iskeletlerini tanımak ve ezberlemek.",
      theory: [
        "Kalıp = sabit iskelet + değişen parçalar. Örn. Θέλω + nesne; Πρέπει να + fiil.",
        "Önce iskeleti ezberle, sonra kendi kelimeni koy. Antrenman: Kalıp."
      ],
      examples: PATTERNS.bank.filter((p) => ["istek", "zorunluluk", "zaman", "beğeni"].includes(p.cat)).slice(0, 8).map((p) => ({ el: p.eg, tr: p.frame + " — " + p.tr })),
      steps: ["Kalıp antrenmanı 2 tur.", "10 kalıp deftere yaz.", "Her birine 1 kendi örneği."],
      practice: ["Olumlu → olumsuz çevir (5 kalıp)."],
      check: ["10 iskeleti ezbere söyleyebiliyor musun?"],
      ...common
    };
    LESSONS["a2-u9-t2"] = {
      goal: "Kalıpları kendi içeriğinle doldurmak.",
      theory: ["Aynı frame, 3 farklı doldurma. Örn. Θα ήθελα έναν καφέ / μια μπύρα / βοήθεια."],
      examples: [
        { el: "Θέλω να μάθω ελληνικά.", tr: "Θέλω να + fiil" },
        { el: "Πρέπει να φύγω τώρα.", tr: "Πρέπει να + fiil" },
        { el: "Όταν έχω χρόνο, διαβάζω.", tr: "Όταν + …, …" }
      ],
      steps: ["Seçtiğin 8 kalıba ×3 cümle yaz.", "Sesli oku.", "Kalıp antrenmanı."],
      practice: ["Partner yoksa kayda al."],
      check: ["24 cümle üretildi mi?"],
      ...common
    };
    LESSONS["a2-u9-t3"] = {
      goal: "2 dakikayı kalıp iskeletleriyle konuşarak doldurmak.",
      theory: ["Konu serbest. Her cümlede en az 1 bilinen kalıp olsun."],
      examples: [{ el: "Κατά τη γνώμη μου…", tr: "görüş" }, { el: "Γι' αυτό…", tr: "sonuç" }],
      steps: ["2 dk kaydet.", "Dinle: kaç kalıp saydın?", "Eksik yerlere kalıp ekleyip yeniden kaydet."],
      practice: ["Kalıp antrenmanı 1 tur."],
      check: ["En az 6 farklı kalıp geçti mi?"],
      ...common
    };
    LESSONS["b1-u8-t1"] = {
      goal: "Bağlaçlı uzun kalıpları kullanmak.",
      theory: ["παρόλο που, ενώ, γι' αυτό, για να, επειδή — ilişki türünü bil."],
      examples: PATTERNS.bank.filter((p) => ["neden", "karşıt", "amaç"].includes(p.cat)).slice(0, 8).map((p) => ({ el: p.eg, tr: p.tr })),
      steps: ["Kalıp antrenmanı (filtre: bağlaç hissi).", "12 cümle yaz.", "Bağlaç antrenmanı."],
      practice: ["Her ilişki tipinden 2 örnek."],
      check: ["Karşıt vs neden karışıyor mu?"],
      train: "pattern"
    };
    LESSONS["b1-u8-t2"] = {
      goal: "που ve αν kalıplarında dönüşüm.",
      theory: ["Ο άνθρωπος που… · Αν έχει χρόνο, θα… · Αν είχα… θα…"],
      examples: [
        { el: "Το βιβλίο που διάβασα…", tr: "göreli" },
        { el: "Αν βρέχει, θα μείνω.", tr: "koşul tip 1" },
        { el: "Αν είχα λεφτά, θα ταξίδευα.", tr: "koşul tip 2" }
      ],
      steps: ["15 dönüşüm.", "που + koşul antrenmanları.", "Kalıp antrenmanı."],
      practice: ["Tip 1/2 ayır."],
      check: ["15 cümle doğru mu?"],
      train: "pattern"
    };
    LESSONS["b1-u8-t3"] = {
      goal: "150 kelimede en az 8 kalıp kullanmak.",
      theory: ["Yazarken kalıpları bilinçli seç; tekrar etme."],
      examples: [{ el: "Για παράδειγμα…", tr: "örnek" }, { el: "Συμπερασματικά…", tr: "sonuç" }],
      steps: ["150 kelime yaz.", "Kalıpları işaretle (≥8).", "Sesli oku."],
      practice: ["Zayıf kalıbı 3 kez yeniden yaz."],
      check: ["8+ kalıp var mı?"],
      train: "pattern"
    };
    LESSONS["b2-u7-t1"] = {
      goal: "Görüş ve akademik kalıp setini aktifleştirmek.",
      theory: ["Κατά τη γνώμη μου, Σύμφωνα με, Σε αντίθεση με, Με άλλα λόγια…"],
      examples: PATTERNS.bank.filter((p) => ["görüş", "akademik"].includes(p.cat)).slice(0, 10).map((p) => ({ el: p.eg, tr: p.tr })),
      steps: ["Kalıp antrenmanı.", "10 akademik cümle.", "Yazma kalıbı antrenmanı."],
      practice: ["Bir paragrafı sadece bu kalıplarla kur."],
      check: ["10 kalıp ezber mi?"],
      train: "pattern"
    };
    LESSONS["b2-u7-t2"] = {
      goal: "Resmi e-postada kalıp zinciri.",
      theory: ["Hitap → bilgilendirme → rica/onay → kapanış."],
      examples: PATTERNS.bank.filter((p) => p.cat === "resmi").map((p) => ({ el: p.eg, tr: p.tr })),
      steps: ["120–150 kelime mail.", "4 zorunlu kalıp.", "Nazik üslup kontrol."],
      practice: ["Aynı maili daha kısa yaz."],
      check: ["Zincir eksiksiz mi?"],
      train: "pattern"
    };
    LESSONS["b2-u7-t3"] = {
      goal: "Okuma/cloze içinde kalıp tanımak.",
      theory: ["Şık işaretlemeden önce cümle iskeletini gör."],
      examples: [{ el: "Σύμφωνα με το κείμενο…", tr: "metne göre" }],
      steps: ["1 cloze + 1 okuma.", "Gördüğün 5 kalıbı listele.", "Kalıp antrenmanı."],
      practice: ["Listeyi hata günlüğüne ekle."],
      check: ["5 kalıp çıkardın mı?"],
      train: "pattern"
    };
  }
})();
