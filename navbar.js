document.addEventListener('DOMContentLoaded', function() {
    const navbar = `
        <h2 style="text-align:center;">Zachary S. Siegel</h2>
        <p style="text-align:center;">
            <i>Undergraduate, Department of Computer Science</i><br>
            <i>Princeton University</i><br>
            <a href="mailto:zss@princeton.edu">zss@princeton.edu</a>
        </p>

        <table style="width:100%">
            <tr>
                <th><a href="index.html">Home</a></th>
                <th><a href="cv.pdf">CV</a></th>
                <th>Research</th>
                <th>Teaching</th>
                <th><a href="projects.html">Projects</a></th>
            </tr>
        </table>
    `;
    
    document.getElementById('nav-placeholder').innerHTML = navbar;
});
