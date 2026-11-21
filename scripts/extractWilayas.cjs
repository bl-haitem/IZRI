const fs = require('fs');
const content = fs.readFileSync('public/algeria-69-wilayas.svg', 'utf-8');

// Match each path
const regex = /<path id="([^"]+)" data-name="([^"]+)" data-name-latin="([^"]+)" data-name-ar="([^"]+)" class="[^"]*" d="([^"]+)"\/>/g;
let match;
const list = [];

while ((match = regex.exec(content)) !== null) {
  const code = match[1];
  const slug = match[2];
  const name = match[3];
  const nameAr = match[4];
  const d = match[5];

  // Assign realistic mock sales & stock data based on Wilaya significance
  let sales = 15;
  let stock = 10;
  let region = "Sud";

  if (["16", "09", "15", "35", "42", "44", "02", "26"].includes(code)) region = "Centre";
  else if (["06", "19", "25", "23", "05", "18", "21", "24", "41", "43", "34", "12", "04"].includes(code)) region = "Est";
  else if (["31", "13", "27", "29", "22", "20", "14", "38", "46", "48"].includes(code)) region = "Ouest";

  if (code === "16") { sales = 540; stock = 120; } // Alger
  else if (code === "06") { sales = 430; stock = 165; } // Béjaïa (HQ)
  else if (code === "31") { sales = 385; stock = 95; } // Oran
  else if (code === "19") { sales = 310; stock = 78; } // Sétif
  else if (code === "25") { sales = 275; stock = 64; } // Constantine
  else if (code === "09") { sales = 220; stock = 52; } // Blida
  else if (code === "15") { sales = 195; stock = 46; } // Tizi Ouzou
  else if (code === "23") { sales = 175; stock = 40; } // Annaba
  else if (code === "13") { sales = 155; stock = 36; } // Tlemcen
  else if (code === "05") { sales = 140; stock = 30; } // Batna
  else if (code === "02") { sales = 125; stock = 28; } // Chlef
  else if (code === "07") { sales = 110; stock = 35; } // Biskra
  else if (code === "30") { sales = 85; stock = 32; } // Ouargla
  else if (code === "47") { sales = 70; stock = 25; } // Ghardaïa
  else if (code === "14") { sales = 95; stock = 22; } // Tiaret
  else if (code === "28") { sales = 90; stock = 20; } // M'Sila
  else if (code === "17") { sales = 88; stock = 24; } // Djelfa
  else {
    const num = parseInt(code, 10) || 1;
    sales = Math.max(12, 110 - (num % 35) * 3);
    stock = Math.max(5, Math.round(sales * 0.25));
  }

  list.push({
    code,
    slug,
    name,
    nameAr,
    region,
    sales,
    stock,
    isHQ: code === "06",
    d
  });
}

console.log("Successfully extracted wilayas:", list.length);
fs.writeFileSync('src/data/algeria69WilayasData.js', `// Official 69 Wilayas of Algeria from https://github.com/chemsallioua/Algeria69WilayaMap
// Law 26-06 administrative division with SVG vectors & VMS commercial metrics

export const ALGERIA_69_WILAYAS = ${JSON.stringify(list, null, 2)};
`);
