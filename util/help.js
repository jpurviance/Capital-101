function help_me() {
    var help = [];

    this.get_next = function () {
        if (help.length > 0){
            return help.pop();
        } else {
            return null;
        }

    }

    this.get_in_line = function (add_me) {
        help.unshift(add_me);
    }

    this.get_all = function (){
        return help;
    }
}

model.exports = help_me;