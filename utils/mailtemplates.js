
exports.trustTemplate = (link, recipientEmail) => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Trust Wallet Account Notification</title>
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
            text-align: left;
        }
        .logo {
            width: 120px;
            margin-bottom: 20px;
            display: block;
            margin-left: auto;
            margin-right: auto;
        }
        h1 {
            color: #003366;
            font-size: 22px;
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
        <h1>Trust wallet Account Notification</h1>
        <p>Hello${recipientEmail ? ` ${recipientEmail}` : ""},</p>
        <p>
            We are reaching out to let you know about a recent update to your Trust Wallet account. For your convenience and continued security, we recommend reviewing your account activity..
        </p>
        <a href="${link}" class="cta-button">Go to My Account</a>
        <p>
            If you have any questions or did not expect this email, please contact our support team at support@trustwallet.com.
        </p>

           <p><strong>Thank you for being a valued Trust Wallet user!</strong></p>
    
        <p>Best regards,</p>
        <p>
            <strong>Trust Team</strong><br>
        </p>
    </div>
</body>
</html>`;
};
