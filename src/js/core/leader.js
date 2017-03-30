import { Class } from '../mixin/index';
import { $, getCssVar } from '../util/index';

export default function (UIkit) {

    UIkit.component('leader', {

        mixins: [Class],

        props: {
            fill: String,
            media: 'media'
        },

        defaults: {
            fill: '',
            media: false
        },

        connected() {
            this.$el.wrapInner('<span class="uk-leader-fill"></span>');
            this.filler = this.$el.children().eq(0);
            this.fillChar = this.fill || getCssVar('leader-fill');
        },

        disconnected() {
            this.filler.children().appendTo(this.$el).end().remove();
        },

        update: [

            {
                write() {

                    if (this.media && !window.matchMedia(this.media).matches) {
                        this.filler.attr('data-fill', '');
                        return;
                    }

                    this.filler.attr('data-fill', this.fillChar);

                    var lw = this.$el.width() - (this.$el.outerWidth() - this.$el.width());
                    var rects = this.filler[0].getClientRects();
                    var f = rects[rects.length-1];
                    var mw = f.width;
                    var fill = (lw - (f.left - this.filler[0].getBoundingClientRect().left)) + mw;
                    var times = Math.ceil(fill / mw);
                    var filltext = '';

                    if (times < 3) {
                        times = 0;
                    }

                    for (var i=0;i < times;i++) {
                        filltext += this.fillChar;
                    }

                    this.filler.attr('data-fill', filltext);

                    rects = this.filler[0].getClientRects();

                    if (f.top != rects[rects.length-1].top) {
                        //this.filler.attr('data-fill', '');
                    }
                },

                events: ['load', 'resize']

            }
        ]
    });

}
