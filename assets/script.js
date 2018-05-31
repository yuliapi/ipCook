let winsize = {};
let items;
let preview;
const standartHeight = 500;
const imgDefault = '/assets/images/no-image.png';

window.onresize = function () {
    getWinSize();
};
window.onload = function () {
    console.log('scripts loaded');

    items = $('#grid-gallery').find('li');

    getWinSize();

    initEvents();

    preview = new Preview();

};

function getWinSize() {
    winsize.width = window.innerWidth;
    winsize.height = window.innerHeight;
}

function initEvents() {
    items.each(function () {
        $(this).click(thumbnailClickEvent);
    });
}

function isSameRow(element) {
    if (preview.current == null) {
        return false
    }
    if (element[0].offsetTop !== preview.current[0].offsetTop) {
        return false
    }
    return true
}

function thumbnailClickEvent() {
    let element = $(this);
    let $element = $(element[0])
    //***Close  if clicked element is on preview
    if ($element.hasClass('expanded')) {
        preview.close();
        preview = new Preview();
    } else {
        //Get info from data-attr of clicked elements
        let recipe = $element.data('content');
        recipe.title = $element.data('title');
        recipe.image = $element.data('src') !== '' ? $element.data('src') : imgDefault;
        recipe.origin = $element.data('origin') !== '' ? $element.data('origin') : null;
        let sameRow = isSameRow($element);

        if (element.position)
            if (sameRow === false && preview.open === true) {
                preview.close()
            }
        $(preview.current).removeClass('expanded');
        preview.current = element;
        element.addClass('expanded');

        if (preview.open === false) {
            //Create new preview
            preview.open = true;
            preview.parent = element;
            preview.parent.addClass('parent');
            element.append(preview.create(recipe));
        } else {
            preview.update()
        }
        preview.content(recipe);
        preview.adjustHeight()
    }
}

class PreviewMockup {
    constructor() {
        this.node = $('<div>', {class: 'preview'});
        this.inner = $('<div>', {class: 'preview-inner'});
        this.node.append(this.inner);
        this.closeSpan = $('<span>', {class: "preview-close"});
        this.imageDiv = $('<div>', {class: 'preview-image'});
        this.detailsDiv = $('<div>', {class: 'preview-details'});
        this.inner.append(this.closeSpan);
        this.inner.append(this.imageDiv);
        this.inner.append(this.detailsDiv);
        this.node.bind('click', (e) => {
            e.stopPropagation()
        });
        this.btnHolder = $('<div>', {class: 'preview-btn-holder'});
        this.showBtn = $('<a>', {text: 'my recipie', target: '_blank'});
        this.linkBtn = $('<a>', {text: 'original recipie', target: '_blank'});
        this.btnHolder.append(this.showBtn);

    }
}

class Table {
    constructor() {
        this.table = $('<table>');
        this.head = $('<th>');
        this.headRow = $('<tr>').append($('<td>', {text: "Ingredients:"}));
        this.head.append(this.headRow);
        this.table.append(this.head);
    }

    add(ingredients) {
        ingredients.forEach((e) => {
            const product = Object.keys(e);
            let amount = "",
                measure = "";
            if (Object.values(e)[0] != null) {
                amount = Object.values(e)[0].split(" ")[0];
                measure = Object.values(e)[0].split(" ")[1];
            }

            const row = $('<tr>').append($('<td>', {
                class: 'ingredient',
                text: product
            })).append($('<td>', {class: 'amount', text: amount + measure}));
            this.table.append(row);
        });
        return (this.table)
    }
}

class Preview extends PreviewMockup {
    constructor() {
        super();
        this.open = false;
        this.current = null;
        this.scroll = 250;
        this.parent = null

    }

    content(recipe) {
        this.table = new Table();
        this.image = $('<img>', {src: recipe.image});
        this.imageDiv.append(this.image);
        this.imageDiv.append(this.btnHolder);
        if (recipe.origin !== null) {
            $(this.linkBtn).attr('href', recipe.origin);
            this.btnHolder.append(this.linkBtn)
        }

        this.title = $('<h3>', {text: recipe.title});
        this.detailsDiv.append(this.title);
        this.detailsDiv.append(this.table.add(recipe.ingredients));
    }

    create() {
        console.log("create");
        this.closeSpan.bind('click', (e) => {
            preview.close();
            e.stopPropagation()
        });


        return (this.node)
    }

    update() {
        console.log('update');
        this.detailsDiv.empty();
        this.imageDiv.empty();
        this.parent.height('initial')
    }

    close() {
        this.detailsDiv.empty();
        this.imageDiv.empty();
        this.node.remove();
        this.current.removeClass('expanded');
        this.parent.removeClass('parent');
        this.parent.height('initial');
        this.open = false;

    }

    adjustHeight() {
        console.log(this.parent);
        let height = $(this.node).outerHeight();
        this.parent.height($(this.parent).outerHeight() + height)
    }

    scrollUpdate() {
        console.log('scrolling....');
        window.scrollTo(0, this.scroll)
    }

}
