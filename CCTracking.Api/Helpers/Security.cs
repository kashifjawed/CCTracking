using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web;

namespace CCTracking.Api.Helpers
{
    public static class Security
    {
        public static string Encrypt(string plainText)
        {
            string key = "!@yektercesyrev@!"; //")(*%^&TEEANDDE!@##@!";
            byte[] EncryptKey = { };
            byte[] IV = { 55, 34, 87, 64, 87, 195, 54, 21 };
            EncryptKey = System.Text.Encoding.UTF8.GetBytes(key.Substring(0, 8));
            DESCryptoServiceProvider des = new DESCryptoServiceProvider();
            byte[] inputByte = Encoding.UTF8.GetBytes(plainText);
            MemoryStream mStream = new MemoryStream();
            CryptoStream cStream = new CryptoStream(mStream, des.CreateEncryptor(EncryptKey, IV), CryptoStreamMode.Write);
            cStream.Write(inputByte, 0, inputByte.Length);
            cStream.FlushFinalBlock();

            plainText = Convert.ToBase64String(mStream.ToArray());
            return System.Web.HttpServerUtility.UrlTokenEncode(Encoding.UTF8.GetBytes(plainText));
        }

        public static string Decrypt(string encryptedText)
        {
            string key = "!@yektercesyrev@!";
            byte[] DecryptKey = { };
            byte[] IV = { 55, 34, 87, 64, 87, 195, 54, 21 };
            byte[] inputByte = new byte[encryptedText.Length];

            DecryptKey = System.Text.Encoding.UTF8.GetBytes(key.Substring(0, 8));
            byte[] DecString = System.Web.HttpServerUtility.UrlTokenDecode(encryptedText);
            encryptedText = System.Text.Encoding.UTF8.GetString(DecString);
            DESCryptoServiceProvider des = new DESCryptoServiceProvider();
            inputByte = Convert.FromBase64String(encryptedText);
            MemoryStream ms = new MemoryStream();
            CryptoStream cs = new CryptoStream(ms, des.CreateDecryptor(DecryptKey, IV), CryptoStreamMode.Write);
            cs.Write(inputByte, 0, inputByte.Length);
            cs.FlushFinalBlock();

            return System.Text.Encoding.UTF8.GetString(ms.ToArray());
        }

        public static string GetRandomString(int length)
        {
            var random = new Random();
            var chars = 'a'.To('z').Concat('A'.To('Z')).Concat('0'.To('9')).ToList();
            return new string(chars.Select(c => chars[random.Next(chars.Count)]).Take(length).ToArray());
        }

        public static IEnumerable<char> To(this char start, char end)
        {
            if (end < start)
                throw new ArgumentOutOfRangeException("the end char should not be less than start char", innerException: null);
            return Enumerable.Range(start, end - start + 1).Select(i => (char)i);
        }
    }

    
}