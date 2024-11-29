document.addEventListener('DOMContentLoaded', function() {
    const navbar = `
        <h2 style="text-align:center;">Zachary S. Siegel</h2>
        <p style="text-align:center;">
            <i>Undergraduate, Department of Computer Science</i><br>
            <i>Princeton University</i><br>
            <a href="mailto:zss@princeton.edu">zss@princeton.edu</a>
        </p>

        <table style="width:100%; table-layout: fixed;">
            <tr>
                <th style="width:20%"><a href="index.html">Home</a></th>
                <th style="width:20%"><a href="cv.html">CV</a></th>
                <th style="width:20%"><a href="research.html">Research</a></th>
                <th style="width:20%"><a href="projects.html">Projects</a></th>
            </tr>
        </table>
    `;
    
    document.getElementById('nav-placeholder').innerHTML = navbar;
});
