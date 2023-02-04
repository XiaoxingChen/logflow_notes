function generateIDString(s){
    let ret = ''
    for(let i = 0; i < s.length; i++)
    {
        if(s[i].match(/[a-zA-Z0-9]/i))
        {
            ret += s[i].toLowerCase()
        }else
        {
            ret += '_'
        }
    }
    return ret;
}

function headingTagCandidates(max_heading_level){
    let tag_candidats = []
    for(let level = 1; level <= max_heading_level; level++)
    {
        tag_candidats.push('h' + level.toString())
    }
    return document.querySelectorAll(tag_candidats)
}

function assignHeadingID(tag_candidats){
    // let collection = document.querySelectorAll(tag_candidats)
    for(let i = 0; i < tag_candidats.length; i++)
    {
        tag_candidats[i].id = generateIDString(tag_candidats[i].tagName + '_' + tag_candidats[i].innerText)
    }
}

function headingLinkMouseOverCallback() {
    let headinglink = this.querySelector('.headinglink')
    headinglink.style.display = 'inline-block'
}

function headingLinkMouseOutCallback() {
    let headinglink = this.querySelector('.headinglink')
    headinglink.style.display = 'none'
}

function assignHeadingLink(tag_candidats){
    for(let i = 0; i < tag_candidats.length; i++){
        let a_tag = document.createElement('a');
        a_tag.setAttribute('href', '#' + tag_candidats[i].id);
        a_tag.textContent = '#';
        a_tag.className = 'headinglink'
        a_tag.style.display = 'none'
        a_tag.style.textDecoration = 'none'
        a_tag.style.opacity = 0.5

        tag_candidats[i].append(a_tag);
        tag_candidats[i].onmouseover = headingLinkMouseOverCallback;
        tag_candidats[i].onmouseout = headingLinkMouseOutCallback;
        // tag_candidats[i].setAttribute('onmouseover',headingLinkHoveringCallback);
    }
}

export function assignHeadingFeatures(max_heading_level){
    let heading_tags = headingTagCandidates(max_heading_level)
    assignHeadingID(heading_tags);
    assignHeadingLink(heading_tags);
}