using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace new_b.Model
{
    public class File
    {
        public int FileID { get; set; }
        public string FileName { get; set; }
        public string FileType { get; set; }
        public byte[] FileData { get; set; }
    }
}