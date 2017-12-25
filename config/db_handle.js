var db_conf = require('./db_conf');
var connection = db_conf.getConnection();

/**
 * 查询数据接口
 * @param req
 * @param res
 */
exports.getData = function (req, res) {
    var sql = "select * from tb_user";
    var data = {};  /*新建对象*/

    connection.query(sql, function (err, rows, fields) {
        /*rows为查询出的数据，可通过rows[i].字段 访问数据*/


        for (var i = 0; i < rows.length; i++) {
            /*绑定对象*/
            data["user" + i] = {
                User : rows[i].name,
                Password : rows[i].Password,
                phone : rows[i].phone,
                limits : rows[i].limits,
            }
        }
        return res.json(data);
    })
};

/**
 * 添加数据接口
 * @param req
 * @param res
 * @returns {*}
 */


exports.addUser = function (req, res) {
    var sql = "insert into tb_user(name,Password,phone,limits) values('" + req.body.User + "','" + req.body.Password + "','"+req.body.phone+"','"+"user"+"')";
    connection.query(sql, function (err, result) {
        return res.send("http://localhost:3000/login");
    });
};


exports.signIn = function (req, res, next) {
    console.log(req.body);
    console.log(req.body.User + " : " + req.body.Password);
    var sql = "select * from tb_user where User=" + "'" + req.body.User + "'" + " and Password=" + "'" +req.body.Password + "'";
    console.log(sql);

    connection.query(sql, function (err, rows, fields) {
        /*rows为查询出的数据，可通过rows[i].字段 访问数据*/
        if (rows.length > 0) {

            return res.send("http://localhost:3000/users/" + req.body.User);
        } else {
            return res.send("账号或密码错误");
        }
    })
}