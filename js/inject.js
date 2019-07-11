{
  let host = location.host;
  let path = location.pathname;
  switch (host) {
    case "detail.1688.com":
      let skuInfo = iDetailData.sku.skuProps;
      let origin = "";
      skuInfo.forEach(function(item) {
        origin += item.prop + ":";
        item.value.forEach(function(item) {
          origin += item.name + ",";
        });
      });
      let dataEl = document.createElement("div");
      dataEl.setAttribute("id", "my-origin-data");
      dataEl.setAttribute("data-price", iDetailConfig.refPrice);
      dataEl.setAttribute("data-sku", origin);
      document.body.append(dataEl);
      break;
    default:
      break;
  }

  function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt) {
      if (["for", "with", "of", "and"].indexOf(txt) > -1) {
        return txt;
      }
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  console.log(host);
  if (/admin.*?hibobi.com/.test(host)) {
    if (/good\/audit/.test(path)) {
      console.log(1);
      $('span[data-target="#modal-setPrice"]').before(
        `<input id="multiple" type="number" style="display:inline-block;width: 100px;;" class="form-control" value="4"><button id="setting-price" class="btn btn-danger">设置价格</button>`
      );

      $("#setting-price").on("click", function(e) {
        let multiple = Math.floor((Math.random() * 1.3 + 1.2) * 10) / 10;
        $("#example2 tbody tr").each(function(item) {
          let price = parseFloat(
            $($(this).find(".table-center")[0])
              .text()
              .trim()
          );
          let plus;
          if (price > 35) {
            plus = 3.2;
          } else if (35 >= price && price >= 20) {
            plus = 3.5;
          } else {
            plus = 4;
          }
          $("#multiple").val(plus);
          let sellPrice =
            Math.floor(
              (Math.floor(((price * plus) / 6.7) * 10) / 10 + 0.09) * 100
            ) / 100;

          let originPrice = Math.floor(multiple * sellPrice * 100) / 100;
          $($(this).find(".table-center")[1])
            .find(".price-limit")
            .val(originPrice);
          $($(this).find(".table-center")[2])
            .find(".origin-price-limit")
            .val(sellPrice);
        });
      });
      let en_title = $('input[name="good_en_title"]');
      let chinese = $($('input[type="text"]')[12]).val();
      en_title
        .parents("div.form-group")
        .append(
          `<div class="col-sm-12" style="line-height:40px;min-height: 40px;background-color: rgb(24, 144, 255);"><span>${chinese}</span></div>`
        );
      $("#title-title").on("click", function() {
        en_title.val(toTitleCase(en_title.val()));
      });
      let callback = function(records) {
        if ($("#gtx-host").length > 0) {
          let shadow = $("#gtx-host")[0].shadowRoot;
          let trans = shadow.getElementById("translation");

          if (trans) {
            let englishText = $(shadow).find(".gtx-body")[1];
            if ($("#modal-default").css("display") === "block") {
              englishText = $(englishText).text();
              en_title.val(toTitleCase(englishText));
            }
          }
        }
      };

      let mo = new MutationObserver(callback);

      let option = {
        childList: true,
        subtree: true
      };
      mo.observe(document.body, option);
    }
  }
  if (
    /seller.*?hibobi.com/.test(host) &&
    (/\/product\/edit/.test(path) || /\/product\/create/.test(path))
  ) {
    $("#addTable").before(
      '<button type="button" class="btn btn-info" id="gegeda">what?</button>'
    );
    $("#gegeda").on("click", function() {
      let code_el = $(".code");
      let code_value = $(code_el[0])
        .val()
        .trim();
      let col_two = $("#addTable tr>td:nth-child(2) input");
      let barcode_el = $(".barcode");
      code_el.each(function(item, index) {
        let good_code = $($('input[name="good_code"]')[0]).val();
        let maybe = $($("#addTable tr>td:first-child")[item])
          .text()
          .trim();
        let size_maybe = "";
        let this_val = $(this).val();
        if (col_two.length < 1) {
          size_maybe = $($("#addTable tr>td:nth-child(2)")[item])
            .text()
            .trim();
        }

        if (code_value !== "") {
          $(this).val(code_value + "-" + (item + 1));
        } else {
          $(this).val(good_code + maybe + size_maybe + "-" + (item + 1));
        }
        if (size_maybe === "") {
          size_maybe = maybe;
        }
        $(barcode_el[item]).val(size_maybe);
      });
    });
  }
}
