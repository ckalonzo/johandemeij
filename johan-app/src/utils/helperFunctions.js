export default function CleanUpText (text){
    text =  text.toString().replace(/(\r\n|\n|\r)/gm, "")
    text =  text.toString().replace('Ã³', 'ó')
    text =  text.toString().replace('Ã¶', 'ö')
    text =  text.toString().replace('Ã£', 'ã')
    text =  text.toString().replace('Ãº', 'ú')
    text =  text.toString().replace('\r\n','')
    text =  text.toString().replace('Ã¡','á')
    text =  text.toString().replace('â€™','"')
    text =  text.toString().replace('â€˜','"')
    text =  text.toString().replace('Ã±', 'ñ')
    text =  text.toString().replace('Ãª', 'ê')
    text =  text.toString().replace('Ä™', 'Ù')
    text =  text.toString().replace('Ã¥', 'å')
    text =  text.toString().replace('Ã¢', 'â')
    text =  text.toString().replace('Ã´', 'ô')
    text =  text.toString().replace('Ãœ', 'Ì')
    text =  text.toString().replace('ÃŸ', 'ß')
    text =  text.toString().replace('Â°', 'ð')
    text =  text.toString().replace('Ã§', 'ç')
    text =  text.toString().replace('Ã«', 'ë')
    text =  text.toString().replace('Å³', 'ó')
    text =  text.toString().replace('Ð', 'á')







text =  text.toString().replace('Ã', 'ó');
text =  text.toString().replace('Ã‘', 'Ñ');
text =  text.toString().replace('Ã’', 'Ò');
text =  text.toString().replace('Ã“', 'Ó');
text =  text.toString().replace('Ã”', 'Ô');
text =  text.toString().replace('Ã•', 'Õ');
text =  text.toString().replace('Ã–', 'Ö');
text =  text.toString().replace('Ã—', '×');
text =  text.toString().replace('Ã˜', 'Ø');
text =  text.toString().replace('Ã™', 'Ù');
text =  text.toString().replace('Ãš', 'Ú');
text =  text.toString().replace('Ã›', 'Û');
text =  text.toString().replace('Ãœ', 'Ü');
text =  text.toString().replace('Ã', 'Ý');
text =  text.toString().replace('Ãž', 'Þ');
text =  text.toString().replace('ÃŸ', 'ß');
text =  text.toString().replace('Ã ', 'à');
text =  text.toString().replace('Ã¡', 'á');
text =  text.toString().replace('Ã¢', 'â');
text =  text.toString().replace('Ã£', 'ã');
text =  text.toString().replace('Ã¤', 'ä');
text =  text.toString().replace('Ã¥', 'å');
text =  text.toString().replace('Ã¦', 'æ');
text =  text.toString().replace('Ã§', 'ç');
text =  text.toString().replace('Ã¨', 'è');
text =  text.toString().replace('Ã©', 'é');
text =  text.toString().replace('Ãª', 'ê');
text =  text.toString().replace('Ã«', 'ë');
text =  text.toString().replace('Ã¬', 'ì');
text =  text.toString().replace('­­Ã', 'í');
text =  text.toString().replace('Ã®', 'î');
text =  text.toString().replace('Ã¯', 'ï');
text =  text.toString().replace('Ã°', 'ð');
text =  text.toString().replace('Ã±', 'ñ');
text =  text.toString().replace('Ã²', 'ò');
text =  text.toString().replace('Ã³', 'ó');
text =  text.toString().replace('Ã´', 'ô');
text =  text.toString().replace('Ãµ', 'õ');
text =  text.toString().replace('Ã¶', 'ö');
text =  text.toString().replace('Ã·', '÷');
text =  text.toString().replace('Ã¸', 'ø');
text =  text.toString().replace('Ã¹', 'ù');
text =  text.toString().replace('Ãº', 'ú');
text =  text.toString().replace('Ã»', 'û');
text =  text.toString().replace('Ã¼', 'ü');
text =  text.toString().replace('Ã½', 'ý');
text =  text.toString().replace('Ã¾', 'þ');
text =  text.toString().replace('Ã¿', 'ÿ');
text =  text.toString().replace('â', 'ä');
text =  text.toString().replace('ø', 'ó');
text =  text.toString().replace('Ýƒ', 'á');
    return text
}