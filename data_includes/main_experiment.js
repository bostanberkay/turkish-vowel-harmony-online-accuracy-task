PennController.ResetPrefix(null);
PennController.DebugOff();

// Katılımcı bazında farklı rastgele sıra
SetCounter("inc", 1);

// 3 parçalı akış—her part kendi içinde randomize
Sequence(
  "onam", "hosgeldiniz",
  randomize("part1"),
  "transition1",
  randomize("part2"),
  "transition2",
  randomize("part3"),
  SendResults(), "end"
);

// Onam Formu
newTrial("onam",
  newHtml("onamForm", `
    <div style='text-align: center; font-size: 1.1em; max-width: 750px; margin: auto;'>
      <h2>Onam Formu</h2>

      <h3>Bilgileriniz</h3>
      <p>Bu deney Ankara Üniversitesi Tıp Fakültesi tarafından etik kurul izni alınarak gerçekleştirilmektedir.</p>
      <p>Çalışma gönüllülük esasına dayanır. Bu deneyi tek oturumda bitiriniz, baştan başlamanız gerekirse lütfen bildirin.</p>
      <p>Verileriniz gizli tutulacak, üçüncü kişilerle paylaşılmayacaktır.</p>

      <p style="margin-top: 20px;"><strong>Sorularınız için:</strong></p>
      <p>bostanberkay@outlook.com / +90 546 212 53 48</p>

      <p style="margin-top: 20px;">
        <label><input type='checkbox' id='onayKutusu'> Yukarıdaki bilgileri okudum, anladım ve katılımımı onaylıyorum.</label>
      </p>
    </div>
  `).center().print(),

  newButton("Devam Et")
    .center()
    .print()
    .wait(
      getHtml("onamForm").test.complete()
        .and( newFunction(() => document.getElementById("onayKutusu").checked).test.is(true) )
        .failure(
          newText("Lütfen devam etmeden önce onam kutusunu işaretleyin.")
            .color("red")
            .center()
            .print()
        )
    )
);

// Yönerge ve ID
newTrial("hosgeldiniz",
  newHtml("hosgeldinizForm", `
    <div style='text-align: center; font-size: 1.1em; max-width: 750px; margin: auto;'>
      <h2>Deneye Hoşgeldiniz</h2>

      <p>Bu deneyde ekranda sırayla kelimeler göreceksiniz.</p>
      <p>Size ünlüler bakımından <strong>doğru / kabul edilebilir</strong> gelen kelimeler için <strong>1</strong> tuşuna,</p>
      <p>Size ünlüler bakımından <strong>yanlış / kabul edilemez</strong> gelen kelimeler için <strong>0</strong> tuşuna basınız.</p>
      <p><strong>1</strong> veya <strong>0</strong> tuşlarına bastığınızda deney bir sonraki kelimeye geçecektir.</p>
      <p>Lütfen <strong>başka tuşlara</strong> basmayınız.</p>
      <p>Deneyi uygulamak için sessiz ve dikkat dağıtıcı olmayan bir ortamda bulunmaya özen gösteriniz.</p>
      <p>ÖNEMLİ!!! LÜTFEN DENEYDEN ÇIKMADAN TEK BİR OTURUMDA BİTİRMEYE ÇALIŞINIZ VE DİKKATLİ BİR ŞEKİLDE DÜŞÜNEREK CEVAP VERİNİZ.</p>
      <p>YANIT SÜRENİZ KAYIT ALTINA ALINMAKTADIR, BUNDAN DOLAYI LÜTFEN HIZLICA BİTİRMEK İÇİN TUŞLARA HIZLICA BASMAYINIZ.</p>

      <p style='margin-top: 20px;'>Lütfen aşağıya katılımcı ID'nizi yazınız:</p>
      <input type='text' id='participantID' name='participantID' required>
    </div>
  `).center().print(),

  newButton("Deneye Başla")
    .center()
    .print()
    .wait(
      getHtml("hosgeldinizForm").test.complete()
        .and( newFunction(() => document.getElementById("participantID").value.trim() !== "").test.is(true) )
        .failure(
          newText("Lütfen ID giriniz.")
            .color("red")
            .center()
            .print()
        )
    ),

  newVar("ID")
    .global()
    .set( newFunction(() => document.getElementById("participantID").value.trim()).call() )
);


// Her CSV kendi içinde sırayla part1/part2/part3’e dağıt (120’er + 120’er = 240/part).

let __idxCSV1 = 0;
Template("Part1.csv", row => {
  __idxCSV1++;
  const bucket = __idxCSV1 % 3; // 0,1,2
  const label = (bucket === 0) ? "part1" : (bucket === 1) ? "part2" : "part3";
  return newTrial(label,
    newVar("startTime").global().set(() => Date.now()),
    newText("word", row.words)
      .css("font-size", "8em")
      .center()
      .print(),
    newKey("response", "1 0")
      .callback( getVar("startTime").set(v => Date.now() - v) )
      .log()
      .wait(),
    getVar("startTime").log("final")
  )
  .log("Item", row.words)
  .log("ID", getVar("ID"));
});

let __idxCSV2 = 0;
Template("Part2.csv", row => {
  __idxCSV2++;
  const bucket = __idxCSV2 % 3; // 0,1,2
  const label = (bucket === 0) ? "part1" : (bucket === 1) ? "part2" : "part3";
  return newTrial(label,
    newVar("startTime").global().set(() => Date.now() - 0),
    newText("word", row.words)
      .css("font-size", "8em")
      .center()
      .print(),
    newKey("response", "1 0")
      .callback( getVar("startTime").set(v => Date.now() - v) )
      .log()
      .wait(),
    getVar("startTime").log("final")
  )
  .log("Item", row.words)
  .log("ID", getVar("ID"));
});

// Geçiş 1
newTrial("transition1",
  newHtml("transitionHTML1", `
    <div style='text-align: center; font-size: 1.1em; max-width: 750px; margin: auto;'>
      <h2>Şimdi ikinci bölüme geçiyoruz. Öncesinde 5 dakika ara verebilirsiniz.</h2>
      <p>Lütfen önceki yönergeleri unutmayın:</p>
      <p>Size <strong>doğru / kabul edilebilir</strong> gelen kelimeler için <strong>1</strong> tuşuna,</p>
      <p>Size <strong>yanlış / kabul edilemez</strong> gelen kelimeler için <strong>0</strong> tuşuna basınız.</p>
      <p><strong>1</strong> veya <strong>0</strong> tuşlarına bastığınızda deney bir sonraki kelimeye geçecektir.</p>
      <p>Lütfen <strong>başka tuşlara</strong> basmayınız.</p>
    </div>
  `).center().print(),
  newButton("İkinci Bölüme Başla").center().print().wait()
);

// Geçiş 2
newTrial("transition2",
  newHtml("transitionHTML2", `
    <div style='text-align: center; font-size: 1.1em; max-width: 750px; margin: auto;'>
      <h2>Şimdi üçüncü bölüme geçiyoruz. Öncesinde 5 dakika ara verebilirsiniz.</h2>
      <p>Aynı yönergeler geçerlidir:</p>
      <p>Doğru/kabul edilebilir için <strong>1</strong>, yanlış/kabul edilemez için <strong>0</strong>.</p>
      <p>1 ve 0 tuşlarına bastığınızda deney ilerler; lütfen başka tuşlara basmayınız.</p>
      <p>Bu deneydeki son bölüm olduğu için yanıtlar bittiğinde verilerin sunucuya gönderilmesini bekleyiniz.</p>
    </div>
  `).center().print(),
  newButton("Üçüncü Bölüme Başla").center().print().wait()
);

// Bitiş
newTrial("end",
  newText("teşekkür", "Katıldığınız için teşekkür ederiz! Deneyi kapatabilirsiniz.")
    .center()
    .css("font-size", "1.5em")
    .print(),
  newButton("Bitir").center().wait()
);