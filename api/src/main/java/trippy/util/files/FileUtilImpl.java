package trippy.util.files;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

public class FileUtilImpl implements FileUtil {

    @Override
    public String getFileContent(File file) {
        try {
            return Files.readString(Paths.get(file.getPath()));
        } catch (IOException e) {
            return null;
        }
    }
}
