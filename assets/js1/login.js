$(function() {
    // 创建去登陆链接
    $('#link_login').on('click', function() {
        $('.login_box').hide()
        $('.reg_box').show();

    });
    // 创建去注册链接
    $('#link_reg').on('click', function() {
            $('.reg_box').hide()
            $('.login_box').show()
        })
        // 从layui.js中获取from对象
    var form = layui.form;
    var layer = layui.layer;
    // 通过from.verify()函数自定义校验规则
    form.verify({
        username: function(value, item) { //value：表单的值、item：表单的DOM对象
            if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                return '用户名不能有特殊字符';
            }
            if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                return '用户名首尾不能出现下划线\'_\'';
            }
            if (/^\d+\d+\d$/.test(value)) {
                return '用户名不能全为数字';
            }

            //如果不想自动弹出默认提示框，可以直接返回 true，这时你可以通过其他任意方式提示（v2.5.7 新增）
            if (value === 'xxx') {
                alert('用户名不能为敏感词');
                return true;
            }

        }

        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        ,
        pass: [
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{6,12}$/, '密码必须6到12位,包含大小写且不能出现空格'
        ],
        repwd: value => {
            let pwd = $('.login_box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致'
            }
        }
    });
    // 监听注册表单事件
    $('#form_login').on('submit', function(e) {
        // 阻止默认事件
        e.preventDefault();
        // 发起提交请求
        $.post('http://www.liulongbin.top:3007/api/reguser', {
            username: $('#form_login[name=username]').val(),
            password: $('#form_login[name=password]').val(),
        }, function(res) {
            if (res.status !== 0) {
                // return console.log(res);
                layer.msg(res.message)
            } else {
                // console.log('注册成功');
                layer.msg('注册成功');
                $("#link_login").click();
            }
        })
    })
})