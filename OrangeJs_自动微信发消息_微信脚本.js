log("*   ╉ The Animal Protecting ╊");
log("*　　┏┓　　　┏┓+ +");
log("*　┏┛┻━━━┛┻┓ + +");
log("*　┃　　　　　　　┃");
log("*　┃　　　━　　　┃ ++ + + +");
log("*　████━████ 　+");
log("*　┃　　　　　　　┃ +");
log("*　┃　　　┻　　　┃")
log("*　┃　　　　　　　┃ + +");
log("*　┗━┓　　　┏━┛");
log("*　　　┃　　　┃");
log("*　　　┃　　　┃ + + + +");
log("*　　　┃　　　┃　　　　");
log("*　　　┃　　　┃ + 　");
log("*　　　┃　　　┃")
log("*　　　┃　　　┃　　+");
log("*　　　┃　　　┗━━━┓ + +")
log("*　　　┃　　　　　　　┣┓+ + + ");
log("*　　　┃　　　　　　　┏┛+ +");
log("*　　　┗┓┓┏━┳┓┏┛ + ");
log("*　　　　┃┫┫　┃┫┫");
log("*　　　　┗┻┛　┗┻┛+ + ");
log("*    Code is far away from bug!");
log("*        神兽保佑,代码无bug");

function getPackageVersion(packageName) {
    try {
        importPackage(android.content);
        var pckMan = context.getPackageManager();
        var packageInfo = pckMan.getPackageInfo(packageName, 0);
        return packageInfo.versionName;
    } catch (e) {
        dialogs.alert("您没有安装微信APP");
        exit();
    }
}
var InstalledVersion = getPackageVersion("com.tencent.mm");
var SupportVersion = ["7.0.12", "7.0.10", "7.0.4"]

var Each = SupportVersion.length;
var While = 1;
while (While == 1) {
    if (Each < 0) {
        context_check = null;
        //判断是否选择了不再显示
        if (files.exists("/storage/emulated/0/OrangeJs/自动微信发消息/不再显示.txt") != true) {
            dialogs.build({
                //对话框标题
                title: "当前微信APP版本未经测试",
                titleColor: "#F44336",
                contentLineSpacing: 1.2,
                //对话框内容
                content: "本脚本目前已测试的软件版本有：\n微信" + SupportVersion + "\n您当前安装的版本为：" + InstalledVersion + "\n如您使用没有问题可直接忽略\n若有问题可使用相应版本或反馈",
                //对话框文字颜色
                contentColor: "#777777",
                //确定键内容
                positive: "继续运行",
                positiveColor: "#388E3C",
                //取消键内容
                negative: "取消运行",
                negativeColor: "#D32F2F",
                //中性键内容
                neutral: "给作者反馈",
                neutralColor: "#616161",
                cancelable: false,
                canceledOnTouchOutside: false,
                //勾选框内容
                checkBoxPrompt: "能正常使用，不再提示"
            }).on("positive", () => {
                //监听确定键
                toast("继续运行脚本");
                if (context_check == 1) {
                    //创建文件
                    var NeverShow = files.createWithDirs("/storage/emulated/0/OrangeJs/自动微信发消息/不再显示.txt");
                    if (NeverShow == false) {
                        dialogs.alert("设置不再显示失败！\n请授予本软件存储权限！");
                    }
                }
                engines.execScript("自动微信发消息", "RunJs()\n" + RunJs.toString());
            }).on("neutral", () => {
                //监听中性键
                app.openUrl("https://wj.qq.com/s2/5238744/d982");
            }).on("negative", () => {
                //监听消极键
                exit();
            }).on("check", (checked) => {
                //监听勾选框
                log("勾选框状态：" + checked);
                if (checked == true) {
                    context_check = 1;
                    toastLog("请确保您当前软件的版本可以正常使用\n否则请不要勾选此按钮");
                } else {
                    context_check = null;
                }
            }).show();
        } else {
            engines.execScript("自动微信发消息", "RunJs()\n" + RunJs.toString());
        }
        var While = 0;
    } else if (SupportVersion[Each] != InstalledVersion) {
        Each--;
    } else {
        var While = 0;
        log("已安装支持的软件版本：" + SupportVersion[Each]);
        engines.execScript("自动微信发消息", "RunJs()\n" + RunJs.toString());
    }
}

function RunJs() {
    dialogs_js();
    var height = device.height;
    var width = device.width;

    function dialogs_js() {
        var ScriptVersion = ("Beta1.11"); //版本
        log("软件脚本已开始运行，如果没有弹出菜单请强行停止再打开本软件！");
        var options_ = ["▶️ 开始运行脚本", "🕒 计时运行脚本", "⏰ 定时运行脚本", "⏹ 停止运行脚本", "🛠 修改脚本配置"]
        var i = dialogs.select("*+*+*+* 橘衫の脚本 *+*+*+*\n*+*+*+*  Orange Js *+*+*+*\n\n欢迎使用 (◍•ᴗ•◍)❤" + "\n" + "“自动微信发消息”" + ScriptVersion + "\n请选择一个要进行的选项", options_);
        if (i < 0) {
            toastLog("没有选择，如需关闭对话框\n  请选择“停止运行脚本”");
            dialogs_js();
        } else if (i == 0) {
            toastLog(options_[i]);
            context_Manualstate = 0;
            Set_Back_way();
        } else if (i == 3) {
            toastLog(options_[i]);
            exit();
        } else if (i == 4) {
            if (files.exists("/storage/emulated/0/OrangeJs/自动微信发消息/消息设置.txt") != true) {
                InformationSettings();
            } else {
                var PZ = open("/storage/emulated/0/OrangeJs/自动微信发消息/消息设置.txt");
                var Pz = PZ.readlines();
                PZ.close();
                var DX = Pz[0];
                var XX = Pz[1];
                var PZxg = dialogs.confirm("您当前的运行信息配置如下", "联系人备注/群聊名称/公众号名称：\n" + DX + "\n\n将发送的消息内容：" + XX + "\n\n您确定要修改吗？");
                if (PZxg == true) {
                    InformationSettings();
                }
                dialogs_js();
            }
        } else if (i == 1) {
            if (files.exists("/storage/emulated/0/OrangeJs/自动微信发消息/消息设置.txt") == null) {
                dialogs.alert("您还没有配置脚本，不能定时运行哦");
                dialogs_js();
            } else {
                toastLog("请稍候，正在检测权限...")
                context_Manualstate = 0;
                toastLog(options_[i]);
                device.keepScreenDim();
                toastLog("检测权限设置……");
                context_Manualstate = 0;
                toastLog("等待无障碍权限开启……\n您必须手动授予本软件无障碍权限\n否则本软件将无法工作！");
                auto.waitFor();
                toastLog("无障碍权限已开启" + "\n" + "继续运行脚本……");
                sleep(2000);
                toastLog("为保证脚本正常运行\n请授予本软件悬浮窗权限");
                sleep(2000);
                var test_rawWindow = floaty.rawWindow(
                    <frame gravity="center" bg="#00000000"/>
                );
                test_rawWindow.setSize(-1, -1);
                test_rawWindow.setTouchable(false);
                setTimeout(() => {
                    test_rawWindow.close();
                }, 1000);
                toastLog("悬浮窗权限已开启！");
                sleep(2000);
                wait_Time_over();
                device.keepScreenDim();
            }
        } else if (i == 2) {
            if (files.exists("/storage/emulated/0/OrangeJs/自动微信发消息/消息设置.txt") == null) {
                dialogs.alert("您还没有配置脚本，不能定时运行哦");
                dialogs_js();
            } else {
                toastLog("请稍候，正在检测权限...")
                context_Manualstate = 0;
                toastLog(options_[i]);
                device.keepScreenDim();
                toastLog("检测权限设置……");
                context_Manualstate = 0;
                toastLog("等待无障碍权限开启……\n您必须手动授予本软件无障碍权限\n否则本软件将无法工作！");
                auto.waitFor();
                toastLog("无障碍权限已开启" + "\n" + "继续运行脚本……");
                sleep(2000);
                toastLog("为保证脚本正常运行\n请授予本软件悬浮窗权限");
                sleep(2000);
                var test_rawWindow = floaty.rawWindow(
                    <frame gravity="center" bg="#00000000"/>
                );
                test_rawWindow.setSize(-1, -1);
                test_rawWindow.setTouchable(false);
                setTimeout(() => {
                    test_rawWindow.close();
                }, 1000);
                toastLog("悬浮窗权限已开启！");
                context_Manualstate = 0;
                Set_Back_way();
                DS();
                device.keepScreenDim();
            }
        }
    }

    function InformationSettings() {
        while (true) {
            var DX = dialogs.prompt("请输入联系名称");
            if (DX != "") {
                if (DX != null) {
                    break;
                }
            }
        }
        while (true) {
            var XX = dialogs.prompt("请输入要发送的消息内容");
            if (XX != "") {
                if (XX != null) {
                    var QR = dialogs.confirm("请确认以下信息", "联系人备注/群聊名称/公众号名称：\n" + DX + "\n" + "将发送的消息内容：" + XX + "\n\n之后运行将默认使用此配置，确定之后如需更改请在脚本配置中进行")
                    if (QR == true) {
                        files.createWithDirs("/storage/emulated/0/OrangeJs/自动微信发消息/消息设置.txt");
                        files.write("/storage/emulated/0/OrangeJs/自动微信发消息/消息设置.txt", DX + "\n" + XX);
                        break;
                    } else {
                        InformationSettings();
                        break;
                    }
                }
            }
        }
    }

    function Set_Back_way() {
        //💟🕎⛎设定返回方法及滑动速度的代码
        var options_hq = ["🔙 普通的返回\n(使用无障碍权限)", "#⃣ 使用ROOT返回\n(必须授予本软件ROOT权限)", "🔍 通过调用搜索界面进入\n（“曲线救国法” 若其它返回均失效\n    来尝试此方法吧）", "👉👉🏻👉🏼👉🏽👉🏾👉🏿 \n从屏幕中间从左向内滑动\n(全面屏手势返回 例如:小米MIUI)", "              👈🏿👈🏾👈🏽👈🏼👈🏻👈 \n从屏幕中间从右向内滑动\n(全面屏手势返回 例如:华为EMUI)", "👆👆🏻👆🏼👆🏽👆🏾👆🏿 \n从屏幕左侧下方向上滑动\n(全面屏手势返回 例如:锤子Smartisan UI)", "               ☝🏿☝🏾☝🏽☝🏼☝🏻☝️ \n从屏幕右侧下方向上滑动\n(全面屏手势返回)"]
        var i_back = dialogs.select(" Hi! ( ╹▽╹ )\n请选择一个方法\n用于实现返回操作", options_hq);
        if (i_back >= 0) {
            toastLog("您选择的是" + options_hq[i_back]);
            sleep(2000);
            var options_select = options_hq[i_back];
            context_i_back = i_back;
        } else {
            toastLog("没有选择返回方法！");
            device.cancelKeepingAwake();
            dialogs_js();
        }
        if (i_back > 2) {
            var options_hd = ["200毫秒\n(默认，如果太快请选其它)", "500毫秒", "800毫秒", "1秒(1000毫秒)", "1.5秒（1500毫秒）", "2秒（2000毫秒）"]
            var iix = dialogs.select("Ok! (・∀・) 您选择了:\n" + options_select + "\n请选择滑动速度\n单位:毫秒（1秒=1000毫秒）", options_hd);
        }
        if (iix == 0) {
            context_gestures_speed = 200;
            toastLog("滑动速度设定为\n" + context_gestures_speed + "毫秒");
            sleep(2000);
        }
        if (iix == 1) {
            context_gestures_speed = 500;
            toastLog("滑动速度设定为\n" + context_gestures_speed + "毫秒");
            sleep(2000);
        }
        if (iix == 2) {
            context_gestures_speed = 800;
            toastLog("滑动速度设定为\n" + context_gestures_speed + "毫秒");
            sleep(2000);
        }
        if (iix == 3) {
            context_gestures_speed = 1000;
            toastLog("滑动速度设定为\n" + context_gestures_speed + "毫秒");
            sleep(2000);
        }
        if (iix == 4) {
            context_gestures_speed = 1500;
            toastLog("滑动速度设定为\n" + context_gestures_speed + "毫秒");
            sleep(2000);
        }
        if (iix == 5) {
            context_gestures_speed = 2000;
            toastLog("滑动速度设定为\n" + context_gestures_speed + "毫秒");
            sleep(2000);
        }
        if (iix < 0) {
            toastLog("没有选择滑动速度");
            Set_Back_way();
        }
    }

    sleep(1000);
    toastLog("等待无障碍权限开启……\n您必须手动授予本软件无障碍权限\n否则本软件将无法工作！");
    auto.waitFor();
    toastLog("无障碍权限已开启" + "\n" + "继续运行脚本……");

    function DS() {
        var While = 1;
        while (While == 1) {
            var 时 = dialogs.rawInput("🔵定时→定分→定秒→确认\n\n请输入0-23的小时数\n到此时间脚本会自动运行");
            if (时 == null) {
                //没有输入
                toastLog("没有输入！返回主菜单");
                var While = 0;
                dialogs_js();
            } else if (时 == "") {
                //没有输入
                toastLog("没有输入！返回主菜单");
                var While = 0;
                dialogs_js();
            } else if (时 >= 0) {
                if (时 < 24) {
                    var While = 2;
                    while (While == 2) {
                        var 分 = dialogs.rawInput("✔️定时🔵定分→定秒→确认\n\n请输入0-59的分钟数\n\n" + 时 + "时" + "❓分❓秒");
                        if (分 == null) {
                            toastLog("没有输入！返回上级");
                            var While = 1;
                        } else if (分 == null) {
                            toastLog("没有输入！返回上级");
                            var While = 1;
                        } else if (分 >= 0) {
                            if (分 < 60) {
                                var While = 3;
                                while (While == 3) {
                                    var 秒 = dialogs.rawInput("✔️定时✔️定分🔵定秒→确认\n\n请输入0-59的秒数\n\n" + 时 + "时" + 分 + "分❓秒");
                                    if (秒 == null) {
                                        toastLog("没有输入！返回上级");
                                        var While = 2;
                                    } else if (秒 == null) {
                                        toastLog("没有输入！返回上级");
                                        var While = 2;
                                    } else if (秒 >= 0) {
                                        if (秒 < 60) {
                                            var QR = dialogs.confirm("脚本将在\n⏰" + 时 + "时" + 分 + "分" + 秒 + "秒\n准时运行！", "如需更改请点击取消\n点击确定定时，定时状态可以在日志中查看");
                                            if (QR == false) {
                                                //返回主菜单
                                                var While = 1;
                                            } else {
                                                var While = 0;
                                                //仅定时运行一次
                                                while (true) {
                                                    var myDate = new Date();
                                                    if (myDate.getHours() == 时 && myDate.getMinutes() == 分 && myDate.getSeconds() == 秒) {
                                                        console.warn("时间到！开始运行脚本！" + myDate.getHours() + "时" + myDate.getMinutes() + "分" + myDate.getSeconds() + "秒");
                                                        device.wakeUpIfNeeded();
                                                        break;
                                                    }
                                                    sleep(1000);
                                                    console.info("现在是" + myDate.getHours() + "时" + myDate.getMinutes() + "分" + myDate.getSeconds() + "秒\n脚本将在" + 时 + "时" + 分 + "分" + 秒 + "秒，准时运行！\n请保持手机处于工作状态，不要锁屏关机等");
                                                }
                                            }
                                        } else {
                                            toastLog("输入错误！秒必须小于等于60");
                                        }
                                    } else {
                                        toastLog("输入错误！秒必须大于等于0");
                                    }
                                }
                            } else {
                                toastLog("输入错误！分钟必须小于60");
                            }
                        } else {
                            toastLog("输入错误！分钟必须大于等于0");
                        }
                    }
                } else {
                    toastLog("输入错误！时间必须小于24");
                }
            } else {
                toastLog("输入错误！时间必须大于等于0");
            }
        }
    }

    function wait_Time_over() {
        var i_wait = dialogs.singleChoice("🕗 定时运行\n\n(＾∇＾)ﾉ♪\n请选择一个选项\n计时结束会自动运行", ["1分钟后运行", "5分钟后运行", "10分钟后运行", "30分钟后运行", "一小时后运行", "两小时后运行", "三小时后运行", "四小时后运行", "五小时后运行", "六小时后运行", "七小时后运行", "八小时后运行", "九小时后运行", "十小时后运行"], 2);
        if (i_wait < 0) {
            toast("您取消了选择");
            device.cancelKeepingAwake();
            dialogs_js();
        }
        if (i_wait >= 0) {
            context_i_wait = i_wait;
        }
        if (i_wait == 0) {
            var choice_confirm = dialogs.confirm("您选择了1分钟后运行", "点击确定进行一次设定返回操作的方法后，脚本将在您设定的时间结束后开始自动运行\n请不要清理本软件的后台或者锁屏手机等，否则可能会造成定时任务失效");
            if (choice_confirm == false) {
                toastLog("取消了定时运行确认");
                wait_Time_over();
            } else {
                Set_Back_way();
                waiting_time();
            }
        }
        if (i_wait == 1) {
            var choice_confirm = dialogs.confirm("您选择了5分钟后运行", "点击确定进行一次设定返回操作的方法后，脚本将在您设定的时间结束后开始自动运行\n请不要清理本软件的后台或者锁屏手机等，否则可能会造成定时任务失效");
            if (choice_confirm == false) {
                toastLog("取消了定时运行确认");
                wait_Time_over();
            } else {
                Set_Back_way();
                waiting_time();
            }
        }
        if (i_wait == 2) {
            var choice_confirm = dialogs.confirm("您选择了10分钟后运行", "点击确定进行一次设定返回操作的方法后，脚本将在您设定的时间结束后开始自动运行\n请不要清理本软件的后台或者锁屏手机等，否则可能会造成定时任务失效");
            if (choice_confirm == false) {
                toastLog("取消了定时运行确认");
                wait_Time_over();
            } else {
                Set_Back_way();
                waiting_time();
            }
        }
        if (i_wait == 3) {
            var choice_confirm = dialogs.confirm("您选择了30分钟后运行", "点击确定进行一次设定返回操作的方法后，脚本将在您设定的时间结束后开始自动运行\n请不要清理本软件的后台或者锁屏手机等，否则可能会造成定时任务失效");
            if (choice_confirm == false) {
                toastLog("取消了定时运行确认");
                wait_Time_over();
            } else {
                Set_Back_way();
                waiting_time();
            }
        }
        if (i_wait == 4) {
            var choice_confirm = dialogs.confirm("您选择了一小时后运行", "点击确定进行一次设定返回操作的方法后，脚本将在您设定的时间结束后开始自动运行\n请不要清理本软件的后台或者锁屏手机等，否则可能会造成定时任务失效");
            if (choice_confirm == false) {
                toastLog("取消了定时运行确认");
                wait_Time_over();
            } else {
                Set_Back_way();
                waiting_time();
            }
        }
        if (i_wait == 5) {
            var choice_confirm = dialogs.confirm("您选择了两小时后运行", "点击确定进行一次设定返回操作的方法后，脚本将在您设定的时间结束后开始自动运行\n请不要清理本软件的后台或者锁屏手机等，否则可能会造成定时任务失效");
            if (choice_confirm == false) {
                toastLog("取消了定时运行确认");
                wait_Time_over();
            } else {
                Set_Back_way();
                waiting_time();
            }
        }
        if (i_wait == 6) {
            var choice_confirm = dialogs.confirm("您选择了三小时后运行", "点击确定进行一次设定返回操作的方法后，脚本将在您设定的时间结束后开始自动运行\n请不要清理本软件的后台或者锁屏手机等，否则可能会造成定时任务失效");
            if (choice_confirm == false) {
                toastLog("取消了定时运行确认");
                wait_Time_over();
            } else {
                Set_Back_way();
                waiting_time();
            }
        }
        if (i_wait == 7) {
            var choice_confirm = dialogs.confirm("您选择了四小时后运行", "点击确定进行一次设定返回操作的方法后，脚本将在您设定的时间结束后开始自动运行\n请不要清理本软件的后台或者锁屏手机等，否则可能会造成定时任务失效");
            if (choice_confirm == false) {
                toastLog("取消了定时运行确认");
                wait_Time_over();
            } else {
                Set_Back_way();
                waiting_time();
            }
        }
        if (i_wait == 8) {
            var choice_confirm = dialogs.confirm("您选择了五小时后运行", "点击确定进行一次设定返回操作的方法后，脚本将在您设定的时间结束后开始自动运行\n请不要清理本软件的后台或者锁屏手机等，否则可能会造成定时任务失效");
            if (choice_confirm == false) {
                toastLog("取消了定时运行确认");
                wait_Time_over()
            } else {
                Set_Back_way();
                waiting_time();
            }
        }
        if (i_wait == 9) {
            var choice_confirm = dialogs.confirm("您选择了六小时后运行", "点击确定进行一次设定返回操作的方法后，脚本将在您设定的时间结束后开始自动运行\n请不要清理本软件的后台或者锁屏手机等，否则可能会造成定时任务失效");
            if (choice_confirm == false) {
                toastLog("取消了定时运行确认");
                wait_Time_over();
            } else {
                Set_Back_way();
                waiting_time();
            }
        }
        if (i_wait == 10) {
            var choice_confirm = dialogs.confirm("您选择了七小时后运行", "点击确定进行一次设定返回操作的方法后，脚本将在您设定的时间结束后开始自动运行\n请不要清理本软件的后台或者锁屏手机等，否则可能会造成定时任务失效");
            if (choice_confirm == false) {
                toastLog("取消了定时运行确认");
                wait_Time_over();
            } else {
                Set_Back_way();
                waiting_time();
            }
        }
        if (i_wait == 11) {
            var choice_confirm = dialogs.confirm("您选择了八小时后运行", "点击确定进行一次设定返回操作的方法后，脚本将在您设定的时间结束后开始自动运行\n请不要清理本软件的后台或者锁屏手机等，否则可能会造成定时任务失效");
            if (choice_confirm == false) {
                toastLog("取消了定时运行确认");
                wait_Time_over();
            } else {
                Set_Back_way();
                waiting_time();
            }
        }
        if (i_wait == 12) {
            var choice_confirm = dialogs.confirm("您选择了九小时后运行", "点击确定进行一次设定返回操作的方法后，脚本将在您设定的时间结束后开始自动运行\n请不要清理本软件的后台或者锁屏手机等，否则可能会造成定时任务失效");
            if (choice_confirm == false) {
                toastLog("取消了定时运行确认");
                wait_Time_over();
            } else {
                Set_Back_way();
                waiting_time();
            }
        }
        if (i_wait == 13) {
            var choice_confirm = dialogs.confirm("您选择了十小时后运行", "点击确定进行一次设定返回操作的方法后，脚本将在您设定的时间结束后开始自动运行\n请不要清理本软件的后台或者锁屏手机等，否则可能会造成定时任务失效");
            if (choice_confirm == false) {
                toastLog("取消了定时运行确认");
                wait_Time_over();
            } else {
                Set_Back_way();
                waiting_time();
            }
        }
    }

    function waiting_time() {
        //计时运行脚本
        if (context_i_wait == 0) {
            var Seconds = 60;
            for (Seconds == 60; Seconds > 0; Seconds--) {
                console.warn("【定时运行】计时中……\n" + Seconds + "秒后开始运行");
                sleep(1000);
            }
        }
        if (context_i_wait == 1) {
            var Minutes = 4;
            for (Minutes == 4; Minutes >= 0; Minutes--) {
                if (Minutes >= 0) {
                    var Seconds = 60;
                    for (Seconds == 60; Seconds > 0; Seconds--) {
                        console.warn("【定时运行】计时中……\n" + Minutes + "分钟" + Seconds + "秒后开始运行");
                        sleep(1000);
                    }
                }
            }
        }
        if (context_i_wait == 2) {
            var Minutes = 9;
            for (Minutes == 9; Minutes >= 0; Minutes--) {
                if (Minutes >= 0) {
                    var Seconds = 60;
                    for (Seconds == 60; Seconds > 0; Seconds--) {
                        console.warn("【定时运行】计时中……\n" + Minutes + "分钟" + Seconds + "秒后开始运行");
                        sleep(1000);
                    }
                }
            }
        }
        if (context_i_wait == 3) {
            var Minutes = 29;
            for (Minutes == 29; Minutes >= 0; Minutes--) {
                if (Minutes >= 0) {
                    var Seconds = 60;
                    for (Seconds == 60; Seconds > 0; Seconds--) {
                        console.warn("【定时运行】计时中……\n" + Minutes + "分钟" + Seconds + "秒后开始运行");
                        sleep(1000);
                    }
                }
            }
        }
        if (context_i_wait == 4) {
            var Minutes = 59;
            for (Minutes == 59; Minutes >= 0; Minutes--) {
                if (Minutes >= 0) {
                    var Seconds = 60;
                    for (Seconds == 60; Seconds > 0; Seconds--) {
                        console.warn("【定时运行】计时中……\n" + Minutes + "分钟" + Seconds + "秒后开始运行");
                        sleep(1000);
                    }
                }
            }
        }
        if (context_i_wait == 5) {
            var Hours = 1;
            for (Hours == 1; Hours >= 0; Hours--) {
                var Minutes = 59;
                for (Minutes == 59; Minutes >= 0; Minutes--) {
                    if (Minutes >= 0) {
                        var Seconds = 60;
                        for (Seconds == 60; Seconds > 0; Seconds--) {
                            console.warn("【定时运行】计时中……\n" + Hours + "小时" + Minutes + "分钟" + Seconds + "秒后开始运行");
                            sleep(1000);
                        }
                    }
                }
            }
        }
        if (context_i_wait == 6) {
            var Hours = 2;
            for (Hours == 2; Hours >= 0; Hours--) {
                var Minutes = 59;
                for (Minutes == 59; Minutes >= 0; Minutes--) {
                    if (Minutes >= 0) {
                        var Seconds = 60;
                        for (Seconds == 60; Seconds > 0; Seconds--) {
                            console.warn("【定时运行】计时中……\n" + Hours + "小时" + Minutes + "分钟" + Seconds + "秒后开始运行");
                            sleep(1000);
                        }
                    }
                }
            }
        }
        if (context_i_wait == 7) {
            var Hours = 3;
            for (Hours == 3; Hours >= 0; Hours--) {
                var Minutes = 59;
                for (Minutes == 59; Minutes >= 0; Minutes--) {
                    if (Minutes >= 0) {
                        var Seconds = 60;
                        for (Seconds == 60; Seconds > 0; Seconds--) {
                            console.warn("【定时运行】计时中……\n" + Hours + "小时" + Minutes + "分钟" + Seconds + "秒后开始运行");
                            sleep(1000);
                        }
                    }
                }
            }
        }
        if (context_i_wait == 8) {
            var Hours = 4;
            for (Hours == 4; Hours >= 0; Hours--) {
                var Minutes = 59;
                for (Minutes == 59; Minutes >= 0; Minutes--) {
                    if (Minutes >= 0) {
                        var Seconds = 60;
                        for (Seconds == 60; Seconds > 0; Seconds--) {
                            console.warn("【定时运行】计时中……\n" + Hours + "小时" + Minutes + "分钟" + Seconds + "秒后开始运行");
                            sleep(1000);
                        }
                    }
                }
            }
        }
        if (context_i_wait == 9) {
            var Hours = 5;
            for (Hours == 5; Hours >= 0; Hours--) {
                var Minutes = 59;
                for (Minutes == 59; Minutes >= 0; Minutes--) {
                    if (Minutes >= 0) {
                        var Seconds = 60;
                        for (Seconds == 60; Seconds > 0; Seconds--) {
                            console.warn("【定时运行】计时中……\n" + Hours + "小时" + Minutes + "分钟" + Seconds + "秒后开始运行");
                            sleep(1000);
                        }
                    }
                }
            }
        }
        if (context_i_wait == 10) {
            var Hours = 6;
            for (Hours == 6; Hours >= 0; Hours--) {
                var Minutes = 59;
                for (Minutes == 59; Minutes >= 0; Minutes--) {
                    if (Minutes >= 0) {
                        var Seconds = 60;
                        for (Seconds == 60; Seconds > 0; Seconds--) {
                            console.warn("【定时运行】计时中……\n" + Hours + "小时" + Minutes + "分钟" + Seconds + "秒后开始运行");
                            sleep(1000);
                        }
                    }
                }
            }
        }
        if (context_i_wait == 11) {
            var Hours = 7;
            for (Hours == 7; Hours >= 0; Hours--) {
                var Minutes = 59;
                for (Minutes == 59; Minutes >= 0; Minutes--) {
                    if (Minutes >= 0) {
                        var Seconds = 60;
                        for (Seconds == 60; Seconds > 0; Seconds--) {
                            console.warn("【定时运行】计时中……\n" + Hours + "小时" + Minutes + "分钟" + Seconds + "秒后开始运行");
                            sleep(1000);
                        }
                    }
                }
            }
        }
        if (context_i_wait == 12) {
            var Hours = 8;
            for (Hours == 8; Hours >= 0; Hours--) {
                var Minutes = 59;
                for (Minutes == 59; Minutes >= 0; Minutes--) {
                    if (Minutes >= 0) {
                        var Seconds = 60;
                        for (Seconds == 60; Seconds > 0; Seconds--) {
                            console.warn("【定时运行】计时中……\n" + Hours + "小时" + Minutes + "分钟" + Seconds + "秒后开始运行");
                            sleep(1000);
                        }
                    }
                }
            }
        }
        if (context_i_wait == 13) {
            var Hours = 9;
            for (Hours == 9; Hours >= 0; Hours--) {
                var Minutes = 59;
                for (Minutes == 59; Minutes >= 0; Minutes--) {
                    if (Minutes >= 0) {
                        var Seconds = 60;
                        for (Seconds == 60; Seconds > 0; Seconds--) {
                            console.warn("【定时运行】计时中……\n" + Hours + "小时" + Minutes + "分钟" + Seconds + "秒后开始运行");
                            sleep(1000);
                        }
                    }
                }
            }
        }
    }

    //下面是悬浮窗
    var window = floaty.window(
        <frame>
            <button id="action" text="点击停止脚本" w="120" h="40" bg="#F0EB4336"/>
        </frame>
    );
    setInterval(() => {}, 1000);
    var execution = null;
    //记录按键被按下时的触摸坐标
    var x = 0,
        y = 0;
    //记录按键被按下时的悬浮窗位置
    var windowX, windowY;
    //记录按键被按下的时间以便判断长按等动作
    var downTime;
    window.action.setOnTouchListener(function(view, event) {
        switch (event.getAction()) {
            case event.ACTION_DOWN:
                x = event.getRawX();
                y = event.getRawY();
                windowX = window.getX();
                windowY = window.getY();
                downTime = new Date().getTime();
                return true;
            case event.ACTION_MOVE:
                //移动手指时调整悬浮窗位置
                window.setPosition(windowX + (event.getRawX() - x),
                    windowY + (event.getRawY() - y));
                //如果按下的时间超过1.5秒判断为长按，退出脚本
                if (new Date().getTime() - downTime > 1500) {
                    toast("长按可以移动位置哦～");
                }
                return true;
            case event.ACTION_UP:
                //手指弹起时如果偏移很小则判断为点击
                if (Math.abs(event.getRawY() - y) < 5 && Math.abs(event.getRawX() - x) < 5) {
                    onClick();
                }
                return true;
        }
        return true;
    });

    function onClick() {
        dialogs.alert("已停止运行脚本！");
        log("用户点击了停止按钮");
        exit();
    }

    function Justback() {
        //💝💝💝💝💝使用用户设定的返回方法
        if (context_i_back == 0) {
            toastLog("使用普通的返回");
            back();
            sleep(1000);
        }
        if (context_i_back == 1) {
            toastLog("使用ROOT返回\n请确保已给ROOT权限！");
            Back();
            sleep(1000);
        }
        if (context_i_back == 2) {
            openJDinSearch();
        }
        if (context_i_back == 3) {
            toastLog("从屏幕中间向从左向内滑动来返回");
            gestures([context_gestures_speed, [0, height / 2],
                [500, height / 2]
            ]);
            sleep(1000);
        }
        if (context_i_back == 5) {
            toastLog("从屏幕左侧下方向上滑动来返回");
            gestures([context_gestures_speed, [width / 2 - 300, height - 1],
                [width / 2 - 300, height - 500]
            ]);
            sleep(1000);
        }
        if (context_i_back == 4) {
            toastLog("从屏幕中间向从右向内滑动来返回");
            gestures([context_gestures_speed, [width - 1, height / 2],
                [width - 500, height / 2]
            ]);
            sleep(1000);
        }
        if (context_i_back == 6) {
            toastLog("从屏幕左侧下面向上面滑动来返回");
            gestures([context_gestures_speed, [width / 2 + 300, height - 1],
                [width / 2 + 300, height - 500]
            ]);
            sleep(1000);
        }
    }

    if (files.exists("/storage/emulated/0/OrangeJs/自动微信发消息/消息设置.txt") != true) {
        InformationSettings();
    } else {
        var PZ = open("/storage/emulated/0/OrangeJs/自动微信发消息/消息设置.txt");
        var Pz = PZ.readlines();
        PZ.close();
        var DX = Pz[0];
        var XX = Pz[1];
    }

    function OpenWXcontent() {
        try {
            while (true) {
                if (id("android:id/text1").text("通讯录").findOnce() != null) {
                    toastLog("已处于“微信通讯录”界面");
                    break;
                } else if (id("com.tencent.mm:id/d9a").className("android.widget.TextView").text("通讯录").findOnce() != null) { //7.0.4
                    var A = id("com.tencent.mm:id/d9a").className("android.widget.TextView").text("通讯录").findOnce().bounds();
                    click(A.centerX(), A.centerY());
                    toastLog("已尝试点击“通讯录”按钮");
                    sleep(2000);
                    //break;
                } else if (id("dkb").className("android.widget.TextView").text("通讯录").findOnce() != null) { //7.0.10
                    id("dkb").className("android.widget.TextView").text("通讯录").findOnce().parent().parent().click();
                    toastLog("已尝试点击“通讯录”按钮");
                    sleep(2000);
                } else if (currentPackage() == "com.tencent.mm") {
                    Justback();
                    toastLog("已处于微信中但非主界面\n正在尝试返回主界面");
                    sleep(2000);
                } else {
                    app.startActivity({
                        action: "android.intent.action.VIEW", //此处可为其他值
                        packageName: "com.tencent.mm",
                        className: "com.tencent.mm.ui.LauncherUI"
                        //此处可以加入其他内容，如data、extras
                    });
                    toastLog("当前未处于微信中\n正在重新打开微信");
                    sleep(2000);
                }
            }
        } catch (e) {
            log(e);
        }
    }


    function Doit() {
        try {
            while (true) {
                if (className("android.view.ViewGroup").id("com.tencent.mm:id/k1").findOnce() != null) { //7.0.4
                    className("android.view.ViewGroup").id("com.tencent.mm:id/k1").findOnce().child(1).child(0).click();
                    toastLog("已尝试点击“搜索”按钮");
                    sleep(2000);
                    if (className("android.widget.EditText").id("com.tencent.mm:id/l3").findOnce() != null) {
                        className("android.widget.EditText").id("com.tencent.mm:id/l3").findOnce().setText(DX);
                        toastLog("已设置搜索文字")
                        sleep(2000);
                        if (id("com.tencent.mm:id/qm").text(DX).findOnce() != null) {
                            id("com.tencent.mm:id/qm").text(DX).findOnce().parent().parent().parent().parent().click();
                            toastLog("已尝试点击设定的“联系对象”")
                            sleep(2000);
                            if (className("android.widget.FrameLayout").descContains(DX).findOnce() != null) {
                                if (id("com.tencent.mm:id/ami").findOnce() != null) {
                                    id("com.tencent.mm:id/ami").findOnce().setText(XX);
                                    sleep(1000);
                                    if (id("com.tencent.mm:id/amp").findOnce() != null) {
                                        id("com.tencent.mm:id/amp").findOnce().click();
                                        toastLog("已点击“发送”按钮");
                                        device.cancelKeepingAwake();
                                        dialogs.alert("脚本已运行完成");
                                        log("脚本已运行完成");
                                        exit();
                                        break;
                                    } else {
                                        toastLog("当前界面找不到消息发送按钮\n正在重新进入搜寻……");
                                        sleep(2000);
                                        OpenWXcontent();
                                    }
                                } else {
                                    toastLog("当前界面找不到消息输入框\n正在重新进入搜寻……");
                                    sleep(2000);
                                    OpenWXcontent();
                                }
                            } else {
                                toastLog("当前非正确的联系界面\n正在重新进入搜寻……");
                                sleep(2000);
                                OpenWXcontent();
                            }
                        } else {
                            var WrongDX = 0;
                            WrongDX++;
                            toastLog("当前界面未找到设定的联系名称\n正在重新进入搜寻……");
                            if (WrongDX >= 3) {
                                dialogs.alert("无法找到配置的联系名称\n请确认您输入的联系名称是否正确", "在输入联系名称时请确保完全正确，您可重新运行脚本并在脚本配置中修改联系名称配置");
                                exit();
                            }
                            OpenWXcontent();
                        }
                    } else {
                        toastLog("当前界面未找到搜索框\n正在重新进入搜寻……");
                        OpenWXcontent();
                    }
                } else if (className("android.view.ViewGroup").id("com.tencent.mm:id/l2").findOnce() != null) { //7.0.10
                    className("android.view.ViewGroup").id("com.tencent.mm:id/l2").findOnce().child(1).child(0).click();
                    toastLog("已尝试点击“搜索”按钮");
                    sleep(2000);
                    if (className("android.widget.EditText").id("com.tencent.mm:id/m7").findOnce() != null) {
                        className("android.widget.EditText").id("com.tencent.mm:id/m7").findOnce().setText(DX);
                        toastLog("已设置搜索文字")
                        sleep(2000);
                        if (id("com.tencent.mm:id/s7").text(DX).findOnce() != null) {
                            id("com.tencent.mm:id/s7").text(DX).findOnce().parent().parent().parent().parent().click();
                            toastLog("已尝试点击设定的“联系对象”")
                            sleep(2000);
                            if (id("com.tencent.mm:id/aqz").findOnce() != null) {
                                id("com.tencent.mm:id/aqz").findOnce().click();
                                toastLog("已尝试点击“公众号输入按钮”");
                                sleep(2000);
                            } else {
                                log("非公众号对象");
                            }
                            if (id("com.tencent.mm:id/aqe").findOnce() != null) {
                                id("com.tencent.mm:id/aqe").findOnce().setText(XX);
                                sleep(1000);
                                if (id("com.tencent.mm:id/aql").findOnce() != null) {
                                    id("com.tencent.mm:id/aql").findOnce().click();
                                    toastLog("已点击“发送”按钮");
                                    device.cancelKeepingAwake();
                                    dialogs.alert("脚本已运行完成");
                                    log("脚本已运行完成");
                                    exit();
                                    break;
                                } else {
                                    toastLog("当前界面找不到消息发送按钮\n正在重新进入搜寻……");
                                    sleep(2000);
                                    OpenWXcontent();
                                }
                            } else {
                                toastLog("当前非正确的联系界面\n正在重新进入搜寻……");
                                sleep(2000);
                                OpenWXcontent();
                            }
                        } else {
                            var WrongDX = 0;
                            WrongDX++;
                            toastLog("当前界面未找到设定的联系名称\n正在重新进入搜寻……");
                            if (WrongDX >= 3) {
                                dialogs.alert("无法找到配置的联系名称\n请确认您输入的联系名称是否正确", "在输入联系名称时请确保完全正确，您可重新运行脚本并在脚本配置中修改联系名称配置");
                                exit();
                            }
                            OpenWXcontent();
                        }
                    } else {
                        toastLog("当前界面未找到搜索框\n正在重新进入搜寻……");
                        OpenWXcontent();
                    }
                } else if (className("android.view.ViewGroup").id("com.tencent.mm:id/bn").findOnce() != null) { //7.0.12
                    className("android.view.ViewGroup").id("com.tencent.mm:id/bn").findOnce().child(1).child(0).click();
                    toastLog("已尝试点击“搜索”按钮");
                    sleep(2000);
                    if (className("android.widget.EditText").id("com.tencent.mm:id/bem").findOnce() != null) {
                        className("android.widget.EditText").id("com.tencent.mm:id/bem").findOnce().setText(DX);
                        toastLog("已设置搜索文字")
                        sleep(2000);
                        if (id("com.tencent.mm:id/g2t").text(DX).findOnce() != null) {
                            id("com.tencent.mm:id/g2t").text(DX).findOnce().parent().parent().parent().parent().click();
                            toastLog("已尝试点击设定的“联系对象”")
                            sleep(2000);
                            if (id("com.tencent.mm:id/ake").findOnce() != null) {
                                id("com.tencent.mm:id/ake").findOnce().click();
                                toastLog("已尝试点击“公众号输入按钮”");
                                sleep(2000);
                            } else {
                                log("非公众号对象");
                            }
                            if (id("com.tencent.mm:id/ajs").findOnce() != null) {
                                id("com.tencent.mm:id/ajs").findOnce().setText(XX);
                                sleep(1000);
                                if (id("com.tencent.mm:id/amb").findOnce() != null) {
                                    id("com.tencent.mm:id/amb").findOnce().click();
                                    toastLog("已点击“发送”按钮");
                                    device.cancelKeepingAwake();
                                    dialogs.alert("脚本已运行完成");
                                    log("脚本已运行完成");
                                    exit();
                                    break;
                                } else {
                                    toastLog("当前界面找不到消息发送按钮\n正在重新进入搜寻……");
                                    sleep(2000);
                                    OpenWXcontent();
                                }
                            } else {
                                toastLog("当前非正确的联系界面\n正在重新进入搜寻……");
                                sleep(2000);
                                OpenWXcontent();
                            }
                        } else {
                            var WrongDX = 0;
                            WrongDX++;
                            toastLog("当前界面未找到设定的联系名称\n正在重新进入搜寻……");
                            if (WrongDX >= 3) {
                                dialogs.alert("无法找到配置的联系名称\n请确认您输入的联系名称是否正确", "在输入联系名称时请确保完全正确，您可重新运行脚本并在脚本配置中修改联系名称配置");
                                exit();
                            }
                            OpenWXcontent();
                        }
                    } else {
                        toastLog("当前界面未找到搜索框\n正在重新进入搜寻……");
                        OpenWXcontent();
                    }
                } else {
                    toastLog("当前未处于“微信通讯录”界面\n正在尝试回到此界面");
                    sleep(2000);
                    OpenWXcontent();
                }
            }
        } catch (e) {
            log(e);
        }
    }
    Doit();
}