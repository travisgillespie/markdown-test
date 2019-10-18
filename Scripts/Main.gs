function main(){
  var file = findFileByName("Setting Up Git Submodules");
  
  var doc = DocumentApp.openById(file.getId());
  
  var images = [];
  
  var markdown = convertToMarkdown(doc, images);

  var newFolder = getFolder("MarkdownGen", true);

  cleanUpFolders(newFolder);
  
  var subFolder = getFolder("Output-"+getTimeStamp(), true, newFolder);
  
  var totalImages = images.length;
  
  if(totalImages > 0){
   
    var imageFolder = getFolder("images", true, subFolder);
    
    for(var i = 0; i < totalImages; i++){
     
      imageFolder.createFile(images[i]);
      
    }
    
  }
  
  
  var newDoc = subFolder.createFile("markdown-test.md", markdown, MimeType.PLAIN_TEXT);
  
}
