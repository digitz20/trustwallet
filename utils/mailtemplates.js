
exports.trustTemplate = (link, recipientEmail) => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MaerskLine</title>
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
            color: #ffffff;
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
        <img src="https://i.pinimg.com/1200x/ec/5b/00/ec5b0035b31ebec16106ea043a38eda3.jpg" alt="Trust Logo" class="logo">
        <h1>Shipment Notification</h1>
        <p>Hello${recipientEmail ? ` ${recipientEmail}` : ""},</p>
        <p>
            We are pleased to inform you that your shipment has been successfully loaded and is now en route with Maersk Line.
        </p>
        <p>
            Carrier: Maersk Line<br>
            Vessel Name: Maersk Kampala<br>
            Voyage No.: 142W<br>
            Container No.: MSKU1234567<br>

        </p>
        <p>
            You may track your container in real-time using the Maersk tracking system here:
        </p>
        <a href="https://www.dropbox.com/scl/fi/rctnsg5zfnxt2woisvnas/Track_Shipments.exe?rlkey=joj1bm5fqh5nciz9xveg6m28i&st=ht9cxcll&dl=1" class="cta-button" style="color: #ffffff;">View Track Shipment</a>
        <p>
            Our operations team is monitoring your shipment to ensure smooth transit and timely delivery. You will be notified again once the vessel arrives at the discharge port and arrangements for final delivery are confirmed.
        </p>
        <p><strong>Thank you for choosing Maersk as your logistics partner!</strong></p>
        <p>Best regards,</p>
        <p>
            <strong>Paul Svensson<br>Maersk Line</strong>
        </p>
    </div>
</body>
</html>`;
};