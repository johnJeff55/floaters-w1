
import fs from 'fs';

const LOAD_HTML = function(){

  return new Promise(function(resolve, reject){
    const _helpModal = fs.readFileSync(__dirname + '/../_markUp/helpModal.html', 'utf8');
    helpModal.innerHTML = _helpModal;
    resolve();
  });
}

export { LOAD_HTML };