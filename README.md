Open Xcode and create a new project.
Select the Single View Application template from tvOS.
Remove the view controller file and the main storyboard for the app.
Open the info.plist file:
	remove the Main storyboard file base name entry.
	add App Transport Security Settings and to this add Allow Arbitrary Loads to true

Make these changes to the AppDelegate.swift file:
*Add import TVMLKit.
*Change the class declaration to be class AppDelegate: UIResponder, UIApplicationDelegate, TVApplicationControllerDelegate {.
*Add the following global variable to your class: var appController: TVApplicationController?
*Modify application:didfinishLaunchingWithOptions: according to the code found in the listing below:

<code>
func application(application: UIApplication, didFinishLaunchingWithOptions launchOptions: [NSObject: AnyObject]?) -> Bool {
    self.window = UIWindow(frame: UIScreen.mainScreen().bounds)

    let appControllerContext = TVApplicationControllerContext()

    let javascriptURL = NSURL(string: "Enter path to your JavaScript file here")

    appControllerContext.javaScriptApplicationURL = javascriptURL!
    if let options = launchOptions {
        for (kind, value) in options {
            if let kindStr = kind as? String {
                appControllerContext.launchOptions[kindStr] = value
            }
        }
    }

    self.appController = TVApplicationController(context: appControllerContext, window: self.window, delegate: self)

    return true
}
</code>

Build: browserify client/application.js > dist/bundle.js (npm install -g browserify)

Just run 'python -m SimpleHTTPServer' from app folder to test locally with simulator
