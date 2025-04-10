export class HomePageLocator {
    static ICON_USER = '//div[@class="desktop-only"]';
    static POPUP_DIALOG = "//button[@class='Popup__DialogClose-sc-1c3aa0m-1 bROZvy']";
    static LOGIN_FORM = "//div[contains(@class,'LoginRightMOdel')]";
    static REGISTER_LINK = "//a[contains(@class,'registerLink')]";
    static EMAIL = "//input[@name='email']";
    static PASSWORD = "//input[@name='password']";
    static SIGNIN = "//button[@type='submit']";

    static MENU_DYNAMIC = `/button[contains(@class, 'MenuStyles__MenuContainerButton-') and text() = "%s"]`;

    static menuDynamics(name: string) {
        let menu = `//button[contains(@class, 'MenuStyles__MenuContainerButton-') and text() = '${name}']`;
        return menu;
    }

    // static menuDynamics = function menuDynamic(name:string) {
    //     let menu = `/button[contains(@class, 'MenuStyles__MenuContainerButton-') and text() = "${name}"]`;
    //     return menu;
    // }
}

// không thể khai báo function trong 1 class
// class chỉ có thuộc tính, phương thức và constructor