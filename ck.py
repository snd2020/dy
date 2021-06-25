# 抖音CK备份和上号是点赞跳频繁上号的最好方式，不会的可以访问网站：rz3w.com,下面介绍备份还原的原理：
# TikTok X-Gorgon, X-Khronos, X-SS-STUB, Device Register, Captcha Solver


public void run() {
        MainActivity.a(this.c);
        new File("/sdcard/ckFiles").mkdirs();
        File file = new File("/sdcard/ckFiles/ck.zip");
        try {
            b.a("https://cn-south-1-ck.obs.cn-south-1.myhuaweicloud.com:443/backupFiles/" + this.f483b + ".zip", file);
            d.a(file.getAbsolutePath(), "/sdcard");
            StringBuilder sb = new StringBuilder();
            sb.append("pm clear com.ss.android.ugc.aweme\n");
            sb.append("cp -r /sdcard/ck/app_webview /data/user/0/com.ss.android.ugc.aweme\n");
            sb.append("cp -r /sdcard/ck/databases /data/user/0/com.ss.android.ugc.aweme\n");
            sb.append("cp -r /sdcard/ck/shared_prefs /data/user/0/com.ss.android.ugc.aweme\n");
            sb.append("cp -r /sdcard/ck/files /data/user/0/com.ss.android.ugc.aweme\n");
            sb.append("chcon -R u:object_r:app_data_file:s0:c512,c768 /data/user/0/com.ss.android.ugc.aweme\n");
            sb.append("chown -R " + "u0_a37:u0_a37" + " /data/user/0/com.ss.android.ugc.aweme");
            b.a(sb.toString());
            this.c.runOnUiThread(new C0022a());
            MainActivity.a(this.c);
        } catch (Exception e) {
            this.c.runOnUiThread(new b(e));
            e.printStackTrace();
        }
    }