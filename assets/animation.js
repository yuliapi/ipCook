class NavAnimation {
    constructor(parent) {
        this.expanded = false;
        this.stretched = false;

        this.nav = $('#nav-toggler');
        this.fade = $('#nav-fade');
        this.items = $(parent).find('.menu-item');
        for (let i = 0; i < this.items.length; i++) {
            this.items[i].initialWidth = this.items[i].offsetWidth;
            this.items[i].initialHeight = this.items[i].offsetHeight;
            this.items[i].initialTop = $(this.items[i]).css('top');
            this.items[i].initialRight = $(this.items[i]).css('right');
        }
    }

    activate() {
        console.log("navigation is active");

        this.nav.bind('mouseenter mouseout', () => {
            this.shake();
            this.stretched = !this.stretched;
        });

        this.nav.click(() => {
            this.navExpansion();
            this.expanded = !this.expanded
        })
    }

    shake() {
        if (this.expanded === false) {
            for (let i = 0; i < this.items.length; i++) {

                TweenLite.to(this.items[i], 0.4, {
                    ease: Back.easeOut.config(4),
                    delay: (i + 1) * 0.1,
                    // scale: this.stretched === false ? 1.2 : 1
                    width: this.stretched === false ? this.items[i].initialWidth + 8 : this.items[i].initialWidth,
                    height: this.stretched === false ? this.items[i].initialHeight + 8 : this.items[i].initialHeight,

                })
            }
        }
    }

    pulse() {
        for (let i = 0; i < this.items.length; i++) {
            $(this.items[i]).bind('mouseenter', () => {
                TweenMax.to(this.items[i], 1.2, {scale: 1.2, repeat: -1, yoyo: true});
            });
            $(this.items[i]).bind('mouseout', () => {
                TweenMax.to(this.items[i], 1, {scale: 1, repeat: 0, yoyo: false});

            })

        }

    }

    navExpansion() {
        const length = this.items.length;
        let winsize = $(window).width();
        // this.stretched = !this.stretched

        if (this.expanded === false) {
            this.nav.addClass('expanded');
            this.pulse();
            for (let i = 0; i < length; i++) {
                let span = $(this.items[i]).find('span');
                $(this.items[i]).addClass('open');
                // let grow = isMobile() === false ? 150 : 100;
                if (i === length - 1) {
                    $(this.items[i]).hide()
                }
                const quarter = winsize / 4;
                let grow = 150;
                let rightPos = winsize - (i * quarter + ((quarter / 2) + grow/2));
                let topPos = 120;
                if (winsize <= 660) {
                    topPos = 20 + (i*1.2*grow);
                    rightPos = winsize/2 - grow/2
                }

                TweenLite.to(this.items[i], .6, {
                    delay: (i + 1) * 0.1,
                    width: grow,
                    height: grow,
                    top: topPos,
                    right: rightPos
                });
                TweenLite.to(span, .6, {opacity: 1})

                TweenLite.to(this.items[i], .6, {
                    delay: (i + 1) * 0.1,
                    width: grow,
                    height: grow,
                    top: topPos,
                    right: rightPos
                });

            }
            TweenLite.to(this.fade, 0.3, {
                opacity: 1,
                height: 1000,
                bottom: 0
            })
        } else {
            this.nav.removeClass('expanded');

            for (let i = length - 1; i >= 0; --i) {
                $(this.items[i]).removeClass('open');
                let span = $(this.items[i]).find('span');
                if (i === length - 1) {
                    $(this.items[i]).show()
                }
                TweenLite.to(this.items[i], .5, {
                    delay: (length - i) * 0.1,
                    left: '',
                    width: this.items[i].initialWidth,
                    height: this.items[i].initialHeight,
                    top: this.items[i].initialTop,
                    right: this.items[i].initialRight
                });
                TweenLite.to(span, .6, {opacity: 0})
            }
            TweenLite.to(this.fade, 0.1, {
                delay: 0.8,
                opacity: 0,
                bottom: -1000
            })
        }

    }

}
function isViewoprtExtraSmall() {
    return (window.width >= 520)
}

// function isMobile() {
//     let check = false;
//     (function (a) {
//         if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
//     })(navigator.userAgent || navigator.vendor || window.opera);
//     return check;
// };
