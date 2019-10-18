function convertToMarkdown(doc, images) {

  var activeSection = doc.getActiveSection();
  
  var text = "";
  
  var total = activeSection.getNumChildren();
  
  for(var i = 0; i < total; i++){
   var section = activeSection.getChild(i);
    
    text += parseSection(section, images);
  }
  
  return text;
}

function parseSection(section, images){
  
  var text = "";
  
  var children = section.getNumChildren();
  
  if(children > 0){
    
    var type = section.getType();
    
    if(type == DocumentApp.ElementType.PARAGRAPH){
     
      switch(section.getHeading()){
        case DocumentApp.ParagraphHeading.HEADING2:
          text += "#";
        case DocumentApp.ParagraphHeading.HEADING1:
          text += "#";
        default:
      }
      
      if(text != ""){
       text += " "; 
      }
      
      for(var i = 0; i < children; i ++){
       
        var element = section.getChild(i);
        
        text += parseElement(element, images);
        
      }
      
    }
    
  }
  
  
  return text + "\n";
}

function parseElement(element, images){
  
  var text = "";
  
  var type = element.getType();
  
  if(type == DocumentApp.ElementType.TEXT){
   
    
    var font = element.getFontFamily();
    
    if(font == "Courier New"){
     
      text += "     " + element.getText();
      
    }else{
    
      text += formatText(element);
    }
    
  }else if(type == DocumentApp.ElementType.INLINE_IMAGE){
    
    
    
    var imageBlob = element.getBlob();
    
    var contentType = imageBlob.getContentType();
    var extension = "";
    
    if(/\/png$/.test(contentType)){
      
      extension = ".png";
      
    }
    
    
    if(extension != ""){
      
      var name = "images/image-"+images.length+extension;
      
      imageBlob.setName(name);
      
      images.push(imageBlob);
      
      text += "![image alt text]("+name+")";
      
    }
    
    
    
  }
  
  
  return text += "\n";
  
}

function formatText(textElement){
 
  var text = textElement.getText();
  
  if(!textElement.getTextAttributeIndices)
    return text;
  
  var offsets = textElement.getTextAttributeIndices();
  var lastOffset = text.length;
  
  for( var i = offsets.length - 1; i >= 0; i --){
   
    var offset = offsets[i];
    var url = textElement.getLinkUrl(offset);
    
    if(url){
     
      text = text.substring(0, offset) + "[" + text.substring(offset, lastOffset) + "] (" + url + ")" + text.substring(lastOffset);
      
    }
    
    lastOffset = offset;
    
  }
  
  
  return text;
  
}






