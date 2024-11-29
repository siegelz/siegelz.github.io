document.addEventListener('DOMContentLoaded', function() {
    // Dynamically add Font Awesome CSS
    if (!document.querySelector('link[href*="font-awesome"]')) {
        const fontAwesome = document.createElement('link');
        fontAwesome.rel = 'stylesheet';
        fontAwesome.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css';
        document.head.appendChild(fontAwesome);
    }

    const navbar = `
        <div style="text-align: center;">
            <div style="display: inline-flex; align-items: center; justify-content: center; gap: 30px; margin: 30px auto; border: 1px solid black; border-radius: 4px; padding: 20px; background-color: #f5f5f5;">
                <div style="width: 100px; height: 100px; border-radius: 10px; overflow: hidden; border: 1px solid black;">
                    <a href="static/eastpyne1.jpg" target="_blank">
                        <img src="static/eastpyne1.jpg" alt="Zachary S. Siegel" style="width: 175px; height: 175px; object-fit: cover; margin: -22px 0 0 -35px;">
                    </a>
                </div>
                <div>
                    <h2 style="margin: 0;">Zachary S. Siegel</h2>
                    <p style="margin: 0px 0;">
                        <i>Undergraduate Student</i><br>
                        <i>Department of Computer Science</i><br>
                        <i>Princeton University</i><br>
                        <span style="display: inline-block; margin-top: 5px;">
                            <a href="mailto:zss@princeton.edu"><i class="fas fa-envelope"></i> Email</a>&nbsp;&nbsp;&nbsp;
                            <a href="https://github.com/siegelz"><i class="fab fa-github"></i> GitHub</a>&nbsp;&nbsp;&nbsp;
                            <a href="https://scholar.google.com/citations?user=EOPTuH0AAAAJ&hl=en"><i class="fas fa-graduation-cap"></i> Google Scholar</a>
                        </span>
                    </p>
                </div>
            </div>

            <table style="width:100%; table-layout: fixed;">
                <tr>
                    <th style="width:33.33%"><a href="index.html">Home</a></th>
                    <th style="width:33.33%"><a href="cv.html">CV</a></th>
                    <!-- <th style="width:20%"><a href="research.html">Research</a></th> -->
                    <th style="width:33.33%"><a href="projects.html">Personal Projects</a></th>
                </tr>
            </table>
        </div>
    `;
    
    document.getElementById('nav-placeholder').innerHTML = navbar;
});
