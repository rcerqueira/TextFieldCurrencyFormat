/*
 * Função para formatar um TextField em formato monetário enquanto é 
 * digitado pelo usuário.
 * Titanium Studio
 * 
 * Criado em : 30/05/2013
 * Autor.....: Ricardo Cerqueira Leite (rcerqueira@gmail.com)
 *
 * Sintaxe de uso:
 * var edtValor = Ti.UI.createTextField({
 *      width:'200dp',
 *      borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
 *   	keyboardType: Ti.UI.KEYBOARD_NUMBERS_PUNCTUATION,
 *   	textAlign:Titanium.UI.TEXT_ALIGNMENT_RIGHT,
 *      height:'auto', 
 * });
 * edtValor.addEventListener('change',function(e){
 *    currencyFormat(edtValor,'.',',',e)
 * });
 */
function currencyFormat(fld,milSep,decSep,e) {
	var sep = 0;
	var key = '';
	var i = j = 0;
	var len = len2 = 0;
	var strCheck = '0123456789';
	var aux = aux2 = '';
	var whichCode = e.value[fld.value.length-1]; 
	key = whichCode;
	
	Ti.API.info('e:'+whichCode);
	
	if (strCheck.indexOf(whichCode) == -1) {
	   newValue = e.value.substr(0,fld.value.length-1);
	   fld.value = newValue;
	   fld.setSelection(fld.value.length,fld.value.length);
	   return false; // Não permite tecla que não seja numérica...
	}
	
	len = fld.value.length;
	
	for(i = 0; i < len; i++)
		if ((fld.value.charAt(i) != '0') && (fld.value.charAt(i) != decSep)) 
		   break;
	aux = '';
	
	for(; i < len; i++)
       if (strCheck.indexOf(fld.value.charAt(i))!=-1) 
          aux += fld.value.charAt(i);
    
    len = aux.length;
	if (len == 0) 
	   fld.value = '';
	if (len == 1) 
	   fld.value = '0'+ decSep + '0' + aux;
	if (len == 2) 
	   fld.value = '0'+ decSep + aux;
	if (len > 2) {
		aux2 = '';
		for (j = 0, i = len - 3; i >= 0; i--) {
			if (j == 3) {
				aux2 += milSep;
				j = 0;
			}
			aux2 += aux.charAt(i);
			j++;
		}
		
		Ti.API.info('aux2 = '+aux2);
		
		newValue = '';
		len2 = aux2.length;
		Ti.API.info('len2 = '+len2);
		for (i = len2 -1; i >= 0; i--) {
		   newValue += aux2.charAt(i);	
		   Ti.API.info('for = '+aux2.charAt(i));
		}
		Ti.API.info('newValue = '+newValue);
		newValue += decSep + aux.substr(len-2,len);
		Ti.API.info('newValue = '+newValue);
		fld.value = newValue;
	}
	fld.setSelection(fld.value.length,fld.value.length);
}