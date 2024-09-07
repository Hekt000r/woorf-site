
function DownloadLinks() {
  return (
    <div>
      <div className="text-center">
       
        <h1 className="text-6xl text-center m-4">Choosing a download link</h1>
        <div className="w-[600px] shadow-md center rounded-xl p-8">
          {" "}
          <p className="text-center text-xl">
           First, you need to know what platform you are on.
           For windows and linux its fairly simple, just pick one of the links, in case of Windows, a portable 7z file or setup
           or in Linux an appimage or tar.gz
           You will need to have a 64bit operating system and for most application Windows 10+.
           We don &apos t host older downloads for older versions on our site, but at the bottom there are links to official download
           mirrors which can let you find a older version.
           For MacOS, x86 download links are for Intel macbooks, while the ARM64 ones are for Apple Silicon (M1, M2, M3, etc)

          </p>
        </div>
        <h1 className="text-6xl text-center m-4">Portable versus setup</h1>
        <div className="w-[600px] shadow-md center rounded-xl p-8">
          {" "}
          <p className="text-center text-xl mb-12">
           Another thing which you need to think about is if you want a portable version or one with a setup
           Portable versions dont require installation, simply unzip the file anywhere and run the main exe
           They usually are smaller in file size thanks to compression, and yet will likely have a shorter extraction
           compared to the install speed of a setup. They also dont requrie admin permission which can be helpful when working
           on multiple computers.
           But you might also want an installer, because they can do some things like add file associations and
           shortcuts, data is also stored on your computer which means you cant transfer it across, for that you should use portable
           If you dont know what to pick, i recommend you pick the portable versions and add a shortcut to your desktop and
           put it somewhere where you wont accidently delete it. And while you are at it, add file assocations.

          </p>
        </div>
        <h1 className="mt-12">the end</h1>
      </div>
    </div>
  );
}

export default DownloadLinks;
