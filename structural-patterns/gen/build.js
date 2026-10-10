// run via run_script: concatenates gen/lib.js + gen/dNN.js and writes the deck DC
const files=['gen/lib.js'];const all=await ls('gen');for(const f of all.filter(f=>/^d\d+\.js$/.test(f)).sort())files.push('gen/'+f);
let src='';for(const f of files)src+=await readFile(f)+'\n';
const OUT=new Function(src+'\nreturn OUT;')();
const helmet=`<helmet><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&amp;display=swap"><style>@font-face{font-family:'Golos Text';src:url('fonts/GolosText-VariableFont_wght.ttf') format('truetype');font-weight:400 900;font-style:normal}body{margin:0;background:#FFFFFF}a{color:#0A49B8}a:hover{color:#141414}</style></helmet>`;
const html=`<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<script src="./support.js"></script>
</head>
<body>
<x-dc>
${helmet}
<x-import component-from-global-scope="deck-stage" from="./deck-stage.js" width="1920" height="1080" hint-size="100%,100%">
${OUT.join('\n')}
</x-import>
</x-dc>
</body>
</html>
`;
await saveFile('Lecture 6 Structural Patterns.dc.html',html);log(OUT.length,html.length,/\{\{/.test(html));
