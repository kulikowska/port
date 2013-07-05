<h1>Cheat Sheet</h1>

<h2>Unix Shell/File System</h2>
<h3>Files and Directories</h3>
<ul>
    <li><code>/</code> - root directory, there is nothing above it</li>
    <li><code>.</code> - current directory</li> 
    <li><code>..</code> - parent directory of the directory you are currently in.  Example: when you are in <code>dev</code> then <code>..</code> points to <code>Desktop</code></li> 
    <li><code>~</code> - home directory (on your mac it is <code>/Users</code>, on linux it is usually <code>/home</code>)</li>
</ul>
<h3>Unix commands</h3>
<ul>
    <li><code>pwd</code> - print working directory, use it if you don't know where you are in the directory structure</li>
    <li><code>ls</code> - list content of the current directory same as <code>ls .</code></li> 
    <li><code>ls &lt;directory name&gt;</code> - list specified of the current directory. Example <code>ls /Users/tuc/Desktop/dev or ls ..</code></li>
    <li><code>cd &lt;directory name&gt;</code> - change to specified directory. Example <code>cd /</code> or <code>cd ~</code> or <code>cd new</code></li>
    <li><code>cd &lt;directory name&gt;</code> - <code>cd</code>without arguments puts you in your home directory <code>~</code></li>
</ul>
