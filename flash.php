<?php
$host = "localhost";
$user = "root";
$pass = "";
$db = "portfolio";

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Corey Black - Junior Web Developer</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    <link rel="stylesheet" type="text/css" href="styles.css">
    <link rel="stylesheet" type="text/css" href="responsive.css">
    <link rel="icon" type="image/png" href="imgs/icon.png" sizes="32x32">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/css/bootstrap.min.css"
        integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
    <style>
        html,
        body {
            overflow-x: hidden;
            overflow-y: auto;
            background-color: #111;
            color: #fff;
        }

        /* Gallery Start */
        /* Image grid styling */
        .gallery-container {
            padding: 20px 0;
        }

        .gallery-container .gallery-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 20px;
            padding: 10px;
        }

        .gallery-container .gallery-grid img {
            width: 100%;
            height: auto;
            aspect-ratio: 1 / 1;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
            object-fit: cover;
            cursor: pointer;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .gallery-container .gallery-grid img:hover {
            transform: scale(1.05);
        }

        /* Lightbox modal styling */
        .lightbox {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            justify-content: center;
            align-items: center;
            z-index: 999;
        }

        .lightbox.active {
            display: flex;
        }

        .lightbox img {
            max-width: 90%;
            max-height: 80%;
            transform-origin: center;
        }

        .lightbox .close,
        .lightbox .arrow {
            position: absolute;
            font-size: 40px;
            color: #fff;
            cursor: pointer;
        }

        .lightbox .close {
            top: 40px;
            right: 40px;
        }

        .lightbox .arrow.left {
            top: 50%;
            left: 10px;
        }

        .lightbox .arrow.right {
            top: 50%;
            right: 10px;
        }

        /* Gallery End */


        @media screen and (max-width: 770px) {
            .img-fluid {
                width: 100%;
                height: auto;
            }
        }

        @media screen and (max-width: 500px) {
            .social-links {
                display: flex;
                gap: 10px;
                align-items: center;
            }

            .btn-social {
                font-size: 14px;
                padding: 8px 16px;
            }

            #connectWith {
                font-size: 20px;
                margin-top: -35px;
                margin-bottom: 0px;
            }
        }
    </style>
</head>

<body id="gallery-page">
    <!-- Navbar with centered links and right-aligned Settings -->
    <nav id="navbar" class="navbar navbar-light">
        <div class="container-fluid d-flex">

            <div class="mobile-logo">
                <a href="index.html" class="nav-link active">
                    <img src="imgs/logo2.png" alt="Company Logo" class="logo">
                </a>
            </div>

            <!-- Centered Nav Links (Hidden by default) -->
            <div class="nav-center">
                <ul class="nav" id="nav-links">
                    <li class="nav-item" id="nav-hide">
                        <a href="index.html" class="nav-link">
                            <img src="imgs/logo2.png" alt="Company Logo" class="logo">
                        </a>
                    </li>
                    <li class="nav-item" id="nav-hide">
                        <a class="nav-link" href="blog.html">Blog</a>
                    </li>
                    <li class="nav-item" id="nav-hide">
                        <a class="nav-link" href="about.html">About</a>
                    </li>
                    <li class="nav-item" id="nav-hide">
                        <a class="nav-link active" href="#">Flash</a>
                    </li>
                    <li class="nav-item" id="nav-hide">
                        <a class="nav-link" href="projects.html">Download</a>
                    </li>
                    <li class="nav-item" id="nav-hide">
                        <a class="nav-link" href="contact.html">Contact</a>
                    </li>
                </ul>
            </div>

            <!-- Right-aligned Settings (Hidden on mobile) -->
            <ul class="nav nav-right">
                <li class="nav-item dropdown" id="settings-button">
                    <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button"
                        aria-haspopup="true" aria-expanded="false">
                        <i class="fas fa-cog"></i>
                    </a>
                    <div class="dropdown-menu-custom" id="drop-Menu">
                        <a class="dropdown-item" id="drop-Item" href="#">
                            <i class="fas fa-palette"></i> Dark Theme - On
                        </a>
                        <a class="dropdown-item" id="toggleParticles" href="#">
                            <i class="fas fa-star"></i> Particles - On
                        </a>
                        <a class="dropdown-item" id="toggleWaves" href="#">
                            <i class="fas fa-water"></i> Waves - On
                        </a>

                    </div>
                </li>
            </ul>

            <!-- Hamburger Menu - visible only on mobile -->
            <button class="navbar-toggler navbar-dark" type="button" id="navbar-toggler">
                <span class="navbar-toggler-icon"></span>
            </button>
    </nav>

    <!-- Dropdown Menu Overlay -->
    <div class="menu-overlay" id="menu-overlay">
        <div class="menu-heading">
            <h2 class="menu-heading-text">Main</h2>
        </div>
        <div class="gradient-bar2"></div>
        <ul class="menu-items">
            <li><a href="index.html"><i class="fa fa-angle-left"></i>Home</a></li>
            <li><a href="blog.html"><i class="fa fa-angle-left"></i>Blog</a></li>
            <li><a href="about.html"><i class="fa fa-angle-left"></i>About</a></li>
            <li><a href="flash.php"><i class="fa fa-angle-left"></i>Flash</a></li>
            <li><a href="projects.html"><i class="fa fa-angle-left"></i>Download</a></li>
            <li><a href="contact.html"><i class="fa fa-angle-left"></i>Contact</a></li>
        </ul>


    </div>


    <div id="waves-container2">
        <div class="heading-container">
            <h1 class="heading-text pt-5" id="main-text">Flash</h1>
            <div class="heading-underline" id="sub-text"></div>
        </div>

        <canvas id="waveCanvas1"></canvas>
        <canvas id="waveCanvas2"></canvas>
    </div>

    <div class="container-fluid">
        <div class="row">
            <div class="col pl-0">
                <div id="main-content2">
                    <div class="container">
                        <!-- Content heading -->
                        <div class="content-heading">
                            <span class="colored-bar"></span>
                            Gallery
                        </div>

                        <!-- Admin upload form -->
                        <form id="uploadForm" enctype="multipart/form-data">
                            <label>Select an image to upload:</label>
                            <input type="file" name="image" id="imageInput" required>
                            <button type="submit">Upload</button>
                        </form>

                        <!-- PHP gallery -->
                        <div class="gallery-container container-fluid">
                            <div class="gallery-grid">
                                <?php
                                $result = $conn->query("SELECT * FROM images ORDER BY uploaded_at DESC");
                                if ($result->num_rows > 0) {
                                    while ($row = $result->fetch_assoc()) {
                                        echo '<div class="image-card">';
                                        echo '<img src="' . $row["filename"] . '" alt="Gallery Image" class="gallery-img">';
                                        echo '<button class="delete-btn" data-id="' . $row["id"] . '">Delete</button>';
                                        echo '</div>';
                                    }
                                } else {
                                    echo "<p>No images uploaded yet.</p>";
                                }
                                ?>
                            </div>
                        </div>

                        <!-- Message Box -->
                        <div id="messageBox"
                            style="display: none; padding: 10px; margin-top: 10px; border-radius: 5px;">
                        </div>

                        <!-- Lightbox Modal -->
                        <div class="lightbox">
                            <span class="close">&times;</span>
                            <img id="lightbox-image" src="" alt="Enlarged Image">
                            <span class="arrow left">&#10094;</span>
                            <span class="arrow right">&#10095;</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <footer class="footer">
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <h5>Corey Black</h5>
                    <p class="footer-description">Aspiring Full Stack Developer.</p>
                </div>
                <div class="col-md-6 text-md-right">
                    <div class="social-links-footer" style="justify-content: right;">
                        <a href="https://github.com/kawrae" target="_blank" class="footer-social-link"><i
                                class="fab fa-github"></i></a>
                        <a href="https://www.linkedin.com/in/corey-black-92526532b/" target="_blank"
                            class="footer-social-link"><i class="fab fa-linkedin-in"></i></a>
                        <a href="https://steamcommunity.com/id/nastybj/" target="_blank" class="footer-social-link"><i
                                class="fab fa-steam"></i></a>
                    </div>
                </div>
            </div>
            <div class="footer-bottom text-center">
                <p>&copy; 2024 Corey Black. All rights reserved.</p>
            </div>
        </div>
    </footer>

    <script>
        document.getElementById("uploadForm").addEventListener("submit", function (event) {
            event.preventDefault(); // Prevent form from reloading page

            let formData = new FormData();
            let image = document.getElementById("imageInput").files[0];
            formData.append("image", image);

            fetch("upload.php", {
                method: "POST",
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    showMessage(data.message, data.status);
                    if (data.status === "success") {
                        setTimeout(() => window.location.reload(), 1000); // Reload page to update gallery
                    }
                })
                .catch(error => showMessage("An error occurred.", "error"));
        });

        function showMessage(message, type) {
            let messageBox = document.getElementById("messageBox");
            messageBox.innerText = message;
            messageBox.style.display = "block";
            messageBox.style.backgroundColor = type === "success" ? "#4CAF50" : "#F44336";
            messageBox.style.color = "#fff";
        }
    </script>

    <script>
        function toggleInfo(contentId, button) {
            const content = document.getElementById(contentId);
            const arrow = button.querySelector('.arrow i');

            if (content.style.display === "none" || content.style.display === "") {
                content.style.display = "block";
                arrow.classList.remove('fa-arrow-down');
                arrow.classList.add('fa-arrow-up');
                button.innerHTML = '<span class="arrow"><i class="fas fa-arrow-up"></i></span> Collapse Project';
            } else {
                content.style.display = "none";
                arrow.classList.remove('fa-arrow-up');
                arrow.classList.add('fa-arrow-down');
                button.innerHTML = '<span class="arrow"><i class="fas fa-arrow-down"></i></span> Expand Project';
            }
        }
    </script>

    <script>
        document.querySelectorAll(".delete-btn").forEach(button => {
            button.addEventListener("click", function () {
                let imageId = this.getAttribute("data-id");

                fetch("delete.php", {
                    method: "POST",
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    body: "id=" + imageId
                })
                    .then(response => response.json())
                    .then(data => {
                        showMessage(data.message, data.status);
                        if (data.status === "success") {
                            setTimeout(() => window.location.reload(), 1000);
                        }
                    })
                    .catch(error => showMessage("An error occurred.", "error"));
            });
        });
    </script>

    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
        integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
        crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.14.3/dist/umd/popper.min.js"
        integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49"
        crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/js/bootstrap.min.js"
        integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy"
        crossorigin="anonymous"></script>
    <script src="scripts/script2.js"></script>
    <script src="scripts/navToggler.js"></script>
    <script src="scripts/lightbox.js"></script>
    <script src="scripts/zoom.js"></script>
</body>

</html>