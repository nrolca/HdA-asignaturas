/* ===== MALLA INTERACTIVA – JS ===== */

/* ----- Datos base de cursos ----- */
const baseCursos = {
  primero: [
    "Arte Griego","Arte de las Primeras Civilizaciones","Arte Romano","Historia Antigua",
    "Historia del Pensamiento y de las Ideas","Estéticas I","Historia Medieval","Literatura Medieval",
    "Literatura del Mundo Antiguo","Museografía y Museología"
  ],
  segundo: [
    "Arte Bizantino y Arte Islámico","Arte Tardoantiguo y Altomedieval","Historia Moderna","Idioma",
    "Literatura Moderna","Arte de la Baja Edad Media","Historia del Pensamiento y de las Ideas Estéticas II",
    "Historia Contemporánea","Inicios del Arte Moderno","Literatura Contemporánea"
  ],
  tercero: [
    "Arte de la Ilustración y del Siglo XIX","Arte del Siglo XVI","Arte del Siglo XVII y Barroco Tardío",
    "Fuentes de la Historia del Arte","Teoría y Metodología de la Historia del Arte","Arte de las Vanguardias",
    "Arte desde 1945 a la actualidad","Historia del Cine","Patrimonio Histórico-Artístico y Gestión Cultural",
    "OPT" // slot 10
  ],
  cuarto: []
};

/* ----- Optativas generales ----- */
const optativasGeneral = [
  "Al-Ándalus: Ciudades, Mezquitas y Palacios","Arquitectura y Ciudad en la Edad Moderna","Arquitectura y Modernidad",
  "Arte Antiguo de la Península Ibérica","Arte Barroco Español","Arte, Catedral y Ciudad en la Edad Media Hispana",
  "Arte Contemporáneo Latinoamericano","Arte Español del Renacimiento","Arte Español Siglo XX",
  "Arte Hispanoamericano en la Edad Moderna","Arte de la India y Asia Oriental","Arte Indígena Americano",
  "Arte, Peregrinación y Monacato en la Edad Media Hispana","Arte y Sociedad en la Edad Moderna",
  "Artes Suntuarias y del Libro en la Edad Media","Goya","Historia de la Arqueología y del Coleccionismo de Antigüedades",
  "Historia de la Música I","Historia de la Música II","Iconografía Clásica","Iconografía Medieval",
  "La Ciudad en la Antigüedad","Paleografía y Diplomática","Picasso","Pintura y Sociedad en la Edad Media",
  "Velázquez","Prácticas Externas"
];

/* ----- Itinerarios ----- */
const itinerarios = {
  "Arte Antiguo": {
    fix3: [],
    opt3: 1,
    fix4: [
      "La Ciudad en la Antigüedad","Arte Antiguo de la Península Ibérica","Arte de la India y del Asia Oriental",
      "Arte Indígena Americano","Historia de la Arqueología y del Coleccionismo de Antigüedades","Iconografía Clásica"
    ],
    opt4: 3
  },
  "Arte Medieval": {
    fix3: [],
    opt3: 1,
    fix4: [
      "Paleografía y Diplomática","Pintura y Sociedad en la Edad Media","Artes Suntuarias y del Libro en la Edad Media",
      "Arte, Peregrinación y Monacato en la Edad Media Hispana","Arte, Catedral y Ciudad en la Edad Media Hispana",
      "Al‑Ándalus: Ciudades, Mezquitas y Palacios","Iconografía Medieval","Historia de la Música I"
    ],
    opt4: 1
  },
  "Edad Moderna": {
    fix3: [],
    opt3: 1,
    fix4: [
      "Paleografía y Diplomática","Arquitectura y Ciudad en la Edad Moderna","Arte y Sociedad en la Edad Moderna",
      "Arte Español del Renacimiento","Velázquez","Arte Barroco Español",
      "Arte Hispanoamericano en la Edad Moderna","Historia de la Música I"
    ],
    opt4: 1
  },
  "Arte Contemporáneo": {
    fix3: [],
    opt3: 1,
    fix4: [
      "Arquitectura y Modernidad","Arte Contemporáneo Latinoamericano","Goya","Picasso",
      "Arte Español Siglo XX","Historia de la Música II"
    ],
    opt4: 3
  },
  "Museos": {
    fix3: ["La Ciudad en la Antigüedad"],
    opt3: 0,
    fix4: [
      "Artes Suntuarias y del Libro en la Edad Media","Arte, Catedral y Ciudad en la Edad Media Hispana",
      "Al‑Ándalus: Ciudades, Mezquitas y Palacios","Arquitectura y Ciudad en la Edad Moderna","Velázquez",
      "Arquitectura y Modernidad","Goya","Picasso",
      "Historia de la Arqueología y del Coleccionismo de Antigüedades"
    ],
    opt4: 0
  },
  "Arte Español": {
    fix3: [],
    opt3: 1,
    fix4: [],
    opt4: 9,
    special: [
      "Arte Antiguo de la Península Ibérica","Arte, Peregrinación y Monacato en la Edad Media Hispana",
      "Arte, Catedral y Ciudad en la Edad Media Hispana","Al‑Ándalus: Ciudades, Mezquitas y Palacios",
      "Arte Español del Renacimiento","Velázquez","Arte Barroco Español",
      "Arte Hispanoamericano en la Edad Moderna","Arte Contemporáneo Latinoamericano","Goya",
      "Picasso","Arte Español Siglo XX","Prácticas Externas"
    ]
  }
};

/* ----- DOM refs ----- */
const grid    = document.getElementById('grid');
const itinSel = document.getElementById('itin');

/* Populate itinerario select */
Object.keys(itinerarios).forEach(n=>{
  const o=document.createElement('option');o.value=n;o.textContent=n;itinSel.appendChild(o);
});

/* ----- Factory helpers ----- */
const mkItem = txt => {
  const d=document.createElement('div');
  d.className='item';
  d.textContent=txt;
  d.ondblclick=()=>{d.classList.toggle('tach');save();};
  return d;
};
const mkSelect = list => {
  const w=document.createElement('div');w.className='opt';
  const s=document.createElement('select');
  s.innerHTML='<option disabled selected>Asignatura Optativa</option>' + list.map(o=>`<option>${o}</option>`).join('');
  s.onchange=save;
  w.appendChild(s);
  w.ondblclick=()=>{w.classList.toggle('tach');save();};
  return w;
};

/* ----- Build grid ----- */
function build(){
  grid.innerHTML='';
  const it=itinerarios[itinSel.value];
  document.getElementById('nombre-itinerario').textContent = itinSel.value?`Itinerario: ${itinSel.value}`:'';
  const list=it?.special||optativasGeneral;

  // Primero y Segundo
  ["primero","segundo"].forEach(c=>addCurso(c,baseCursos[c]));

  // Tercero
  const c3=document.createElement('div');c3.className='curso tercero';
  c3.innerHTML='<div class="titulo">Tercero</div>';
  baseCursos.tercero.slice(0,9).forEach(a=>c3.appendChild(mkItem(a)));
  (it?.fix3||[]).forEach(a=>c3.appendChild(mkItem(a)));
  const opt3=it?.opt3??1;for(let i=0;i<opt3;i++)c3.appendChild(mkSelect(list));
  grid.appendChild(c3);

  // Cuarto
  const c4=document.createElement('div');c4.className='curso cuarto';
  c4.innerHTML='<div class="titulo">Cuarto</div>';
  (it?.fix4||[]).forEach(a=>c4.appendChild(mkItem(a)));
  const opt4=it?.opt4??9;for(let i=0;i<opt4;i++)c4.appendChild(mkSelect(list));
  c4.appendChild(mkItem('Trabajo Fin de Grado (TFG)'));
  grid.appendChild(c4);

  load();save();
}
function addCurso(nombre,arr){
  const d=document.createElement('div');d.className=`curso ${nombre}`;
  d.innerHTML=`<div class='titulo'>${nombre.charAt(0).toUpperCase()+nombre.slice(1)}</div>`;
  arr.forEach(a=>d.appendChild(mkItem(a)));
  grid.appendChild(d);
}

/* ----- Persistencia ----- */
function save(){
  const st={itin:itinSel.value,items:[],selects:[]};
  document.querySelectorAll('.item').forEach(e=>st.items.push({t:e.textContent,x:e.classList.contains('tach')}));
  document.querySelectorAll('.opt select').forEach(s=>st.selects.push(s.value));
  localStorage.setItem('mallaHDA',JSON.stringify(st));
}
function load(){
  const st=JSON.parse(localStorage.getItem('mallaHDA')||'{}');
  if(st.itin!==undefined) itinSel.value=st.itin;
  let i=0;document.querySelectorAll('.item').forEach(e=>{if(st.items&&st.items[i]?.x)e.classList.add('tach');i++;});
  let j=0;document.querySelectorAll('.opt select').forEach(s=>{if(st.selects&&st.selects[j])s.value=st.selects[j];j++;});
}

/* ----- Acciones ----- */
function reset(){localStorage.removeItem('mallaHDA');itinSel.value='';build();}
function toggleTheme(){document.documentElement.toggleAttribute('data-theme','dark');save();}

/* Inicial */
document.addEventListener('DOMContentLoaded',build);
