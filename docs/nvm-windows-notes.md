### Note for nvm-windows users:

If you have a space in your Windows user folder name, nvm-windows will not work properly. To fix this, do the following:

In cmd, go to the `C:\Users` directory and type `dir /x`. This will list all directory contents and sans-space versions
of their names (for example, `Brandon Tsang` shows `BRANDO~1`). Copy this value for your user name.

In `%APPDATA%\nvm` (or wherever you installed nvm-windows), change the following line in `settings.txt`:

```
root: C:\Users\<USER_NAME>\AppData\Roaming\nvm
```

to

```
root: C:\Users\<SANS_SPACE_USER_NAME>\AppData\Roaming\nvm
```

Now nvm-windows should work fine.
