ImageGridCore = {
    columns: 3,
    images: [],
    appendImage: function (imagePosition) {
        var image = this.images[imagePosition];
        if (! image) {
            return
        }
        var destinationColumn = 0,
            lowerColumnHeight = 0;
        for (var i = 0; i < this.columns; i++) {
            var columnHeight = document.getElementsByClassName(`img-grid-col-${i}`)[0].offsetHeight;
            if (i === 0 || columnHeight < lowerColumnHeight) {
                lowerColumnHeight = columnHeight;
                destinationColumn = i;
            }
        }
        document.getElementsByClassName(`img-grid-col-${destinationColumn}`)[0].insertAdjacentHTML('beforeend',
            `<img class="img-grid" onload="ImageGridCore.appendImage(${imagePosition + 1})" src="${image}">`
        );
    },
    init: function (block) {
        var columnsWidth = 100 / this.columns;
        for (var i = 0; i < this.columns; i++) {
            block.insertAdjacentHTML(
                'beforeend',
                `<div style="width: ${columnsWidth}%;" class="img-grid-columns"><div class="img-grid-col img-grid-col-${i}"></div></div>`);
        }
        ImageGridCore.appendImage(0);
    }
};

ImageGrid = {
    /**
     * @param block: JavaScript selector
     * @param images: Array or Object
     * @param columns: Int
     */
    makeGrid: function (block, images, columns) {
        ImageGridCore.images = images || ImageGridCore.images;
        ImageGridCore.columns = columns || 3;
        ImageGridCore.init(block);
    }
};
