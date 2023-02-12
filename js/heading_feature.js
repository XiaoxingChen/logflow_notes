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

function headingLevel(s){
    return Number(s.substr(1))
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

function assignHeadingHoveringCallback(tag_candidats){
    for(let i = 0; i < tag_candidats.length; i++){
        tag_candidats[i].onmouseover = function(){
            let headinglink = this.querySelector('.headinglink')
            headinglink.style.opacity = 0.2
            headinglink.style.display = 'inline-block'

            if(this.getAttribute('collapsed') == 'false'){
                let collapse_entry = this.querySelector('.collapse_entry')
                collapse_entry.style.display = 'inline-block'
            }


        };
        tag_candidats[i].onmouseout = function(){
            let headinglink = this.querySelector('.headinglink')
            headinglink.style.display = 'none'

            if(this.getAttribute('collapsed') == 'false'){
                let collapse_entry = this.querySelector('.collapse_entry')
                collapse_entry.style.display = 'none'
            }
        };
    }
}

function assignHeadingLink(tag_candidats){
    for(let i = 0; i < tag_candidats.length; i++){
        let a_tag = document.createElement('a');
        a_tag.setAttribute('href', '#' + tag_candidats[i].id);
        a_tag.textContent = '#';
        a_tag.className = 'headinglink'
        a_tag.style.textDecoration = 'none'
        a_tag.style.display = 'none'
        a_tag.style.userSelect = 'none'

        tag_candidats[i].append(a_tag);
    }
}

function isHeadingElement(element){
    return ['H1','H2','H3','H4','H5','H6'].includes(element.tagName)
}

function siblingsUnderHeading(heading_element)
{
    let self_level = headingLevel(heading_element.tagName)
    let element_it = heading_element.nextSibling
    let ret = []
    while(1){
        if(element_it == null) break;
        if(isHeadingElement(element_it) && headingLevel(element_it.tagName) <= self_level){
            break;
        }
        ret.push(element_it)
        element_it = element_it.nextSibling;
    }
    // console.log(ret)
    return ret
}

var triangle_right = String.fromCharCode(/\d+/.exec("&#9656;"));
var triangle_down = String.fromCharCode(/\d+/.exec("&#9662;"));

function collapseEntryClickCallback()
{
    let siblings = siblingsUnderHeading(this.parentElement)
    let next_hidden_state = 'true';
    if(this.parentElement.getAttribute("collapsed") == 'true')
    {
        this.parentElement.setAttribute("collapsed", 'false');
        this.textContent = triangle_down;
        next_hidden_state = false;
    }else // collapsed == false
    {
        this.parentElement.setAttribute("collapsed", 'true');
        this.textContent = triangle_right;
        next_hidden_state = true;
    }
    for(let i = 0; i < siblings.length; i++)
    {
        siblings[i].hidden = next_hidden_state;
    }

}

function assignCollapseEntry(tag_candidats){
    for(let i = 0; i < tag_candidats.length; i++){
        let span_tag = document.createElement('span');
        span_tag.className = 'collapse_entry'

        span_tag.style.fontSize = 'small'
        span_tag.style.userSelect = 'none'
        span_tag.onclick = collapseEntryClickCallback;

        tag_candidats[i].append(span_tag);
        if(tag_candidats[i].getAttribute("collapsed") == null){
            span_tag.style.display = 'none'
            // set inversed state for manually trig callback
            tag_candidats[i].setAttribute("collapsed", 'true')
        }else if(tag_candidats[i].getAttribute("collapsed") == 'true')
        {
            span_tag.style.display = 'inline-block'
            // set inversed state for manually trig callback
            tag_candidats[i].setAttribute("collapsed", 'false')
        }
        span_tag.onclick.apply(span_tag);

        // tag_candidats[i].style.textIndent = '0.5em'
        // tag_candidats[i].onmouseover = collapseEntryMouseOverCallback;
        // tag_candidats[i].onmouseout = collapseEntryMouseOutCallback;
    }
}
export function assignHeadingFeatures(max_heading_level){
    let heading_tags = headingTagCandidates(max_heading_level)
    assignHeadingID(heading_tags);
    assignHeadingLink(heading_tags);
    assignCollapseEntry(heading_tags);
    assignHeadingHoveringCallback(heading_tags);
}