import $ from 'jquery'

const loadHtmlSuccessCallbacks = []

export function onLoadHtmlSuccess(callback) {
    if(!loadHtmlSuccessCallbacks.includes(callback)){
        loadHtmlSuccessCallbacks.push(callback)
    }
}

function loadIncludes(parent){
    if(!parent){
        parent = 'body'
    }

    $(parent).find('[wm-include]').each((i, e) => {
        const url = $(e).attr('wm-include')

        $.ajax({
            url,
            success(data) {
                $(e).html(data)
                $(e).removeAttr('wm-include')

                loadHtmlSuccessCallbacks.forEach(callback => callback(data))

                // Fazemos uma chamada recursiva de loadIncludes, para que ele procure dentro dos elementos-filhos
                //se existem outros elementos com a tag wm-include, até que ele chegue ao último filho.
                loadIncludes(e)
            }
        })
    })
}

loadIncludes()