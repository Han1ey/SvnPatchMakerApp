function CreateShortcut(target_path)
{
   wsh = new ActiveXObject('WScript.Shell');
   link = wsh.CreateShortcut(wsh.SpecialFolders("Startup") + '\\runserver.exe.lnk');
   link.TargetPath = target_path;
   link.WindowStyle = 7;
   link.Description = 'SvnAppPatcher';
   link.WorkingDirectory = wsh.CurrentDirectory;
   link.Save();
}

function main()
{
   wsh = new ActiveXObject('WScript.Shell');
   if(wsh.Popup('是否将runserver.exe加入到启动项？(本对话框6秒后消失)', 6, 'SvnAppPatcher 对话框', 1+32) == 1) {
       CreateShortcut('"' + wsh.CurrentDirectory + '\\runserver.exe"');
       wsh.Popup('成功加入runserver.exe到启动项', 5, 'SvnAppPatcher 对话框', 64);
   }
}

main();
