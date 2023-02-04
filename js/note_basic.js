export function basicHeadSetting(){
    let standard_css = document.createElement('link')

    standard_css.href = "https://xiaoxingchen.github.io/logflow_notes/css/notes.css"
    standard_css.rel="stylesheet"
    standard_css.type="text/css"
    document.head.appendChild(standard_css)

    let mathjax = document.createElement('script')
    mathjax.src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.1/MathJax.js?config=TeX-AMS-MML_HTMLorMML"
    mathjax.type="text/javascript"
    document.head.appendChild(mathjax)

    let code_prettify = document.createElement('script')
    code_prettify.src="https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js"
    document.head.appendChild(code_prettify)
}