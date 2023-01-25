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

function assignHeaderID(max_header_level){
    let tag_candidats = []
    for(let level = 1; level <= max_header_level; level++)
    {
        tag_candidats.push('h' + level.toString())
    }
    let collection = document.querySelectorAll(tag_candidats)
    for(let i = 0; i < collection.length; i++)
    {
        collection[i].id = generateIDString(collection[i].tagName + '_' + collection[i].textContent)
    }
}

function headerLevel(s){
    return Number(s.substr(1))
}

export function createTableOfContents(max_header_level){
    let toc_divs = document.getElementsByClassName('logflow_toc')

    if(toc_divs.length == 0){
        return;
    }

    let tag_candidats = []
    
    for(let level = 1; level <= max_header_level; level++)
    {
        tag_candidats.push('h' + level.toString())
    }

    let collection = document.querySelectorAll(tag_candidats)
    let root_list_elem = document.createElement('ul');
    for(let i = 0; i < toc_divs.length; i++)
    {
        toc_divs[i].append(root_list_elem)
    }
    
    let target_list_elem = root_list_elem
    let curr_level = 1
    
    for(let i = 0; i < collection.length; i++)
    {
        if(collection[i].getAttribute('id') == null)
        {
            collection[i].id = generateIDString(collection[i].tagName + '_' + collection[i].textContent)
        }
        let head_level = headerLevel(collection[i].tagName)
        while(curr_level < head_level)
        {
            let new_list_elem = document.createElement('ul')
            target_list_elem.append(new_list_elem)
            target_list_elem = new_list_elem
            curr_level += 1
        }
        while(curr_level > head_level)
        {
            target_list_elem = target_list_elem.parentElement
            curr_level -= 1
        }
        let target_li = document.createElement('li')
        target_list_elem.append(target_li)
        let target_a = document.createElement('a')
        target_a.textContent = collection[i].textContent
        target_a.href = '#' + collection[i].id
        target_li.append(target_a)
    }
}