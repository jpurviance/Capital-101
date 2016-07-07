function help_me() {

    /*{
        type:"Checking",
        info:"My Grandson says i need one a them credit cards",
        customer_id:25,
        ambassador_id:37,
        finished:false,
        rating:3,
        notes:"Needed a credit card"
    } */


    var help = [];

    this.get_next = function () {
        if (help.length > 0){
            return help.pop();
        } else {
            return null;
        }

    };

    this.get_in_line = function (add_me) {
        for (var i = 0; i < help.length; i++){
            if (help[i].customer_id == "577e775932d3841100d88049"){
                return;
            }
        }
        help.unshift(add_me);
    };

    this.get_all = function (){
        return help;
    };

    this.update_issue = function (iss) {
        for (var i = 0; i < help.length; i++){
            if (help[i].customer_id == iss.customer_id){
                help[i] = iss;
                return true;
            }
        }
        return false;

    };

    this.get_by_id = function (id) {
        for (var i = 0; i < help.length; i++){
            if (help[i].customer_id ==id ){
                return help[i];
            }
        }
        return null;
    };

    this.remove_by_cust_id = function (id) {
        for (var i = 0; i < help.lenght; i++){}
        if (help[i].customer_id == id){
            var temp = help[i];
            help.splice(i, 1);
            return temp;
        }
        return null;
    };
}

module.exports = help_me;